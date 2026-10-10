export interface DatasetStats {
  sorted: number[];
  count: number;
  min: number;
  max: number;
  mean: number;
  median: number;
  stdDev: number;
  q1: number;
  q3: number;
  iqr: number;
  lowerFence: number;
  upperFence: number;
  outliersIqr: number[];
  outliersZScore: number[];
}

/**
 * Calculates complete statistical summary for a numerical dataset
 */
export function calculateStats(data: number[], zThreshold = 2.0): DatasetStats | null {
  const valid = data.filter((n) => Number.isFinite(n));
  if (valid.length < 3) return null;

  const sorted = [...valid].sort((a, b) => a - b);
  const n = sorted.length;
  const min = sorted[0];
  const max = sorted[n - 1];

  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  const variance = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);

  // Percentile calculation with linear interpolation
  const getPercentile = (p: number): number => {
    const idx = (n - 1) * p;
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    if (lower === upper) return sorted[lower];
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  const q1 = getPercentile(0.25);
  const median = getPercentile(0.5);
  const q3 = getPercentile(0.75);
  const iqr = q3 - q1;

  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  const outliersIqr = sorted.filter((v) => v < lowerFence || v > upperFence);

  const outliersZScore = sorted.filter((v) => {
    if (stdDev === 0) return false;
    const z = Math.abs((v - mean) / stdDev);
    return z > zThreshold;
  });

  return {
    sorted,
    count: n,
    min,
    max,
    mean,
    median,
    stdDev,
    q1,
    q3,
    iqr,
    lowerFence,
    upperFence,
    outliersIqr,
    outliersZScore,
  };
}

export function calculateZScore(value: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
}

export function isValueOutlier(
  value: number,
  stats: DatasetStats,
  rule: 'iqr' | 'zscore',
  zThreshold = 2.0
): boolean {
  if (rule === 'iqr') {
    return value < stats.lowerFence || value > stats.upperFence;
  }
  const z = Math.abs(calculateZScore(value, stats.mean, stats.stdDev));
  return z > zThreshold;
}

export function formatStat(val: number, precision = 1): string {
  if (!Number.isFinite(val)) return '—';
  if (Math.abs(val) >= 1000) return val.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 100) return val.toFixed(0);
  return val.toFixed(precision);
}

/**
 * Generates a realistic dataset with an optional outlier injected
 */
export function generateSyntheticDataset(
  category: 'temperature' | 'exam' | 'latency' | 'pricing' | 'steps' = 'exam',
  injectOutlier = true
): { dataset: number[]; targetValue: number; unit: string; description: string } {
  let baseMean = 75;
  let baseSpread = 12;
  let unit = 'pts';
  let desc = 'Exam scores out of 100';

  if (category === 'temperature') {
    baseMean = 68;
    baseSpread = 6;
    unit = '°F';
    desc = 'Daily afternoon temperature in autumn';
  } else if (category === 'latency') {
    baseMean = 120;
    baseSpread = 25;
    unit = 'ms';
    desc = 'API server request response times';
  } else if (category === 'pricing') {
    baseMean = 45;
    baseSpread = 15;
    unit = '$';
    desc = 'Coffee bar customer ticket totals';
  } else if (category === 'steps') {
    baseMean = 6500;
    baseSpread = 1200;
    unit = 'steps';
    desc = 'Daily step count telemetry';
  }

  // Generate 12-16 normal observations (clumping around normal distribution)
  const count = 12 + Math.floor(Math.random() * 5);
  const data: number[] = [];

  for (let i = 0; i < count; i++) {
    // Box-Muller normal distribution sample
    const u1 = Math.random() || 0.001;
    const u2 = Math.random() || 0.001;
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const val = Math.round(baseMean + z * (baseSpread / 2));
    data.push(Math.max(1, val));
  }

  const st = calculateStats(data);
  let target: number;

  if (injectOutlier && st) {
    const isHigh = Math.random() > 0.4;
    if (isHigh) {
      target = Math.round(st.upperFence + baseSpread * (1.2 + Math.random() * 1.5));
    } else {
      target = Math.round(Math.max(1, st.lowerFence - baseSpread * (1.2 + Math.random() * 1.5)));
    }
  } else if (st) {
    // Normal point near median or within Q1-Q3
    target = Math.round(st.q1 + Math.random() * st.iqr);
  } else {
    target = Math.round(baseMean);
  }

  return {
    dataset: data,
    targetValue: target,
    unit,
    description: desc,
  };
}
