import { describe, it, expect } from 'vitest';
import { calculateStats, isValueOutlier, calculateZScore } from '../lib/stats';
import { QUESTION_BANK, getQuestionsForGame } from '../data/questionBank';

describe('Statistical calculations', () => {
  it('calculates mean, median, IQR, and fences accurately for a symmetric distribution', () => {
    const data = [10, 20, 30, 40, 50];
    const stats = calculateStats(data);
    expect(stats).not.toBeNull();
    if (!stats) return;

    expect(stats.mean).toBe(30);
    expect(stats.median).toBe(30);
    expect(stats.min).toBe(10);
    expect(stats.max).toBe(50);
    expect(stats.q1).toBe(20);
    expect(stats.q3).toBe(40);
    expect(stats.iqr).toBe(20);
    // Lower fence: 20 - 1.5 * 20 = -10
    // Upper fence: 40 + 1.5 * 20 = 70
    expect(stats.lowerFence).toBe(-10);
    expect(stats.upperFence).toBe(70);
  });

  it('flags values outside the 1.5*IQR fences as outliers', () => {
    const data = [8, 9, 10, 11, 75];
    const stats = calculateStats(data);
    expect(stats).not.toBeNull();
    if (!stats) return;

    expect(isValueOutlier(75, stats, 'iqr')).toBe(true);
    expect(isValueOutlier(10, stats, 'iqr')).toBe(false);
  });

  it('flags values with |Z-score| > 2 correctly', () => {
    const mean = 100;
    const sd = 10;
    expect(calculateZScore(125, mean, sd)).toBe(2.5);
    expect(calculateZScore(80, mean, sd)).toBe(-2.0);
  });
});

describe('Question Bank Integrity', () => {
  it('has at least 40 questions', () => {
    expect(QUESTION_BANK.length).toBeGreaterThanOrEqual(40);
  });

  it('every question has valid structure, explanation, and hint', () => {
    QUESTION_BANK.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(q.prompt).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(q.hint).toBeTruthy();
      expect(q.commonPattern).toBeTruthy();
      expect(q.whyOutlier).toBeTruthy();

      if (q.type === 'categorical') {
        expect(q.options).toBeDefined();
        expect(q.options!.length).toBeGreaterThanOrEqual(3);
        const outliers = q.options!.filter((o) => o.isOutlier);
        expect(outliers.length).toBe(1);
      }
    });
  });

  it('getQuestionsForGame returns required number of questions', () => {
    const quickEasy = getQuestionsForGame('quick', 'easy', 5);
    expect(quickEasy.length).toBe(5);

    const categoryMedium = getQuestionsForGame('category', 'medium', 5);
    expect(categoryMedium.length).toBe(5);

    const scientistHard = getQuestionsForGame('scientist', 'hard', 5);
    expect(scientistHard.length).toBe(5);
  });
});
