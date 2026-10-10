import React, { useMemo, useState } from 'react';
import { DatasetStats, formatStat } from '../lib/stats';

interface DataChartProps {
  stats: DatasetStats;
  targetValue?: number | null;
  method?: 'iqr' | 'zscore';
  revealed?: boolean;
  isTargetOutlier?: boolean | null;
  unit?: string;
  title?: string;
}

export const DataChart: React.FC<DataChartProps> = ({
  stats,
  targetValue = null,
  method = 'iqr',
  revealed = false,
  isTargetOutlier = null,
  unit = '',
  title = 'Fig. 1 — the data',
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ value: number; x: number; y: number } | null>(null);

  const W = 820;
  const H = 290;
  const P = 50;
  const axisY = 225;

  const loFence = method === 'iqr' ? stats.lowerFence : stats.mean - 2 * stats.stdDev;
  const hiFence = method === 'iqr' ? stats.upperFence : stats.mean + 2 * stats.stdDev;

  const { min, max, x } = useMemo(() => {
    const allVals = [...stats.sorted, loFence, hiFence, ...(targetValue !== null ? [targetValue] : [])];
    let minVal = Math.min(...allVals);
    let maxVal = Math.max(...allVals);
    const span = maxVal - minVal || 10;
    const padding = span * 0.1;
    minVal -= padding;
    maxVal += padding;

    const scaleX = (v: number) => P + ((v - minVal) / (maxVal - minVal)) * (W - 2 * P);
    return { min: minVal, max: maxVal, x: scaleX };
  }, [stats, loFence, hiFence, targetValue]);

  // Generate 6 neat axis ticks
  const ticks = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => min + ((max - min) * i) / 5);
  }, [min, max]);

  // Beeswarm / collision-avoidance stacking for discrete points
  const dots = useMemo(() => {
    const binWidth = 14;
    const columnCounts = new Map<number, number>();

    return stats.sorted.map((val, idx) => {
      const cx = x(val);
      const colKey = Math.round(cx / binWidth);
      const count = columnCounts.get(colKey) ?? 0;
      columnCounts.set(colKey, count + 1);

      const cy = 185 - count * 12;
      return { val, cx, cy, idx };
    });
  }, [stats.sorted, x]);

  // Target point styling
  const targetX = targetValue !== null ? x(targetValue) : null;
  const targetColor = !revealed
    ? '#E85D16' // Burnt orange before reveal
    : isTargetOutlier
    ? '#D94828' // Destructive red-orange
    : '#218653'; // Success green

  const fenceXLo = Math.max(P - 10, x(loFence));
  const fenceXHi = Math.min(W - P + 10, x(hiFence));
  const normalZoneWidth = Math.max(fenceXHi - fenceXLo, 2);

  return (
    <div className="retro-card overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b-[1.5px] border-[#30343B] bg-[#FFFCF4] px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="serif text-base font-bold text-[#242830] sm:text-lg">
            {title}
          </span>
          {unit && (
            <span className="retro-chip !py-0 !px-1.5 !text-[10px] lowercase">
              {unit}
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-full border border-[#30343B] bg-[#245D9C]" />
            Data
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-4 rounded-sm border border-[#30343B] bg-[#245D9C]/20" />
            IQR (Q1–Q3)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-0 w-3.5 border-t-2 border-dashed border-[#E85D16]" />
            {method === 'iqr' ? '1.5×IQR Fences' : '±2σ Normal Range'}
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="chart-grid-bg relative p-2 sm:p-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Normal Zone Shaded Band */}
          <rect
            x={fenceXLo}
            y={35}
            width={normalZoneWidth}
            height={180}
            rx={6}
            fill="#E85D16"
            fillOpacity={0.06}
            stroke="#E85D16"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />

          {/* Lower & Upper Fence Labels */}
          <text
            x={fenceXLo}
            y={26}
            fill="#E85D16"
            fontSize={11}
            fontWeight="600"
            textAnchor="middle"
            className="mono"
          >
            {formatStat(loFence)}
          </text>
          <text
            x={fenceXHi}
            y={26}
            fill="#E85D16"
            fontSize={11}
            fontWeight="600"
            textAnchor="middle"
            className="mono"
          >
            {formatStat(hiFence)}
          </text>

          {/* Handwritten Annotation: "normal zone" */}
          <text
            x={(fenceXLo + fenceXHi) / 2}
            y={28}
            fill="#E85D16"
            fontSize={18}
            textAnchor="middle"
            className="hand"
          >
            "normal" zone
          </text>

          {/* IQR Box (Q1 to Q3) */}
          <rect
            x={x(stats.q1)}
            y={196}
            width={Math.max(x(stats.q3) - x(stats.q1), 2)}
            height={18}
            rx={3}
            fill="#245D9C"
            fillOpacity={0.2}
            stroke="#30343B"
            strokeWidth={1.5}
          />

          {/* Median Marker */}
          <line
            x1={x(stats.median)}
            x2={x(stats.median)}
            y1={192}
            y2={218}
            stroke="#30343B"
            strokeWidth={2.5}
          />

          {/* Mean Marker (Dashed green/gray line) */}
          <line
            x1={x(stats.mean)}
            x2={x(stats.mean)}
            y1={42}
            y2={214}
            stroke="#218653"
            strokeWidth={1.5}
            strokeDasharray="3 4"
          />
          {/* Handwritten Annotation: "mean" */}
          <text
            x={x(stats.mean) + 6}
            y={56}
            fill="#218653"
            fontSize={18}
            className="hand"
          >
            mean ({formatStat(stats.mean)})
          </text>

          {/* Horizontal Axis */}
          <line
            x1={P}
            x2={W - P}
            y1={axisY}
            y2={axisY}
            stroke="#30343B"
            strokeWidth={1.5}
          />

          {/* Axis Ticks and Labels */}
          {ticks.map((tickVal, i) => (
            <g key={i}>
              <line
                x1={x(tickVal)}
                x2={x(tickVal)}
                y1={axisY}
                y2={axisY + 6}
                stroke="#30343B"
                strokeWidth={1}
              />
              <text
                x={x(tickVal)}
                y={axisY + 20}
                fill="#6B7280"
                fontSize={11}
                textAnchor="middle"
                className="mono font-medium"
              >
                {formatStat(tickVal)}
              </text>
            </g>
          ))}

          {/* Scatter Data Points */}
          {dots.map((d) => (
            <circle
              key={d.idx}
              cx={d.cx}
              cy={d.cy}
              r={5}
              fill="#245D9C"
              stroke="#30343B"
              strokeWidth={1.2}
              className="cursor-pointer transition-transform hover:scale-125"
              onMouseEnter={() => setHoveredPoint({ value: d.val, x: d.cx, y: d.cy })}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}

          {/* Target Value Pin / Indicator (if present) */}
          {targetValue !== null && targetX !== null && (
            <g>
              {/* Vertical pin line */}
              <line
                x1={targetX}
                x2={targetX}
                y1={65}
                y2={axisY}
                stroke={targetColor}
                strokeWidth={2}
                strokeDasharray={revealed ? 'none' : '4 3'}
              />

              {/* Pulsing ring if unresolved */}
              {!revealed && (
                <circle
                  cx={targetX}
                  cy={65}
                  r={12}
                  fill={targetColor}
                  className="pulse-ring"
                />
              )}

              {/* Target circular marker */}
              <circle
                cx={targetX}
                cy={65}
                r={7}
                fill={targetColor}
                stroke="#30343B"
                strokeWidth={1.5}
              />

              {/* Callout box for target */}
              <rect
                x={targetX - 32}
                y={242}
                width={64}
                height={26}
                rx={4}
                fill={targetColor}
                stroke="#30343B"
                strokeWidth={1.5}
              />
              <text
                x={targetX}
                y={259}
                fontSize={12}
                fontWeight="700"
                textAnchor="middle"
                fill="#FFFCF4"
                className="mono"
              >
                {formatStat(targetValue)}
              </text>

              {/* Handwritten annotation on suspicious target */}
              {!revealed && (
                <text
                  x={targetX > W / 2 ? targetX - 10 : targetX + 10}
                  y={88}
                  fill={targetColor}
                  fontSize={17}
                  textAnchor={targetX > W / 2 ? 'end' : 'start'}
                  className="hand font-bold"
                >
                  something feels off?
                </text>
              )}
            </g>
          )}

          {/* Hover tooltip */}
          {hoveredPoint && (
            <g>
              <rect
                x={hoveredPoint.x - 28}
                y={hoveredPoint.y - 30}
                width={56}
                height={22}
                rx={3}
                fill="#242830"
                stroke="#30343B"
                strokeWidth={1}
              />
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - 15}
                fontSize={11}
                fontWeight="600"
                textAnchor="middle"
                fill="#FFFCF4"
                className="mono"
              >
                {formatStat(hoveredPoint.value)}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Summary Footer Bar with Statistics */}
      <div className="grid grid-cols-2 divide-x-[1.5px] divide-y-[1.5px] sm:divide-y-0 divide-[#30343B] border-t-[1.5px] border-[#30343B] bg-[#FFFCF4] sm:grid-cols-6 text-center">
        <div className="p-2 sm:p-2.5">
          <div className="retro-label !text-[10px]">Mean</div>
          <div className="mono text-sm sm:text-base font-bold text-[#242830]">
            {formatStat(stats.mean)}
          </div>
        </div>
        <div className="p-2 sm:p-2.5">
          <div className="retro-label !text-[10px]">Median</div>
          <div className="mono text-sm sm:text-base font-bold text-[#242830]">
            {formatStat(stats.median)}
          </div>
        </div>
        <div className="p-2 sm:p-2.5">
          <div className="retro-label !text-[10px]">Std Dev (σ)</div>
          <div className="mono text-sm sm:text-base font-bold text-[#242830]">
            {formatStat(stats.stdDev)}
          </div>
        </div>
        <div className="p-2 sm:p-2.5">
          <div className="retro-label !text-[10px]">Q1 (25%)</div>
          <div className="mono text-sm sm:text-base font-bold text-[#242830]">
            {formatStat(stats.q1)}
          </div>
        </div>
        <div className="p-2 sm:p-2.5">
          <div className="retro-label !text-[10px]">Q3 (75%)</div>
          <div className="mono text-sm sm:text-base font-bold text-[#242830]">
            {formatStat(stats.q3)}
          </div>
        </div>
        <div className="p-2 sm:p-2.5">
          <div className="retro-label !text-[10px]">IQR</div>
          <div className="mono text-sm sm:text-base font-bold text-[#242830]">
            {formatStat(stats.iqr)}
          </div>
        </div>
      </div>
    </div>
  );
};
