import React from 'react';
import { RefreshCw, SlidersHorizontal, Calculator } from 'lucide-react';
import { sound } from '../lib/sound';

interface DatasetControlsProps {
  rawInput: string;
  onChangeRaw: (val: string) => void;
  targetValue: string;
  onChangeTarget: (val: string) => void;
  detectionRule: 'iqr' | 'zscore';
  onChangeRule: (rule: 'iqr' | 'zscore') => void;
  onShuffle: () => void;
  observationCount: number;
  disabled?: boolean;
}

export const DatasetControls: React.FC<DatasetControlsProps> = ({
  rawInput,
  onChangeRaw,
  targetValue,
  onChangeTarget,
  detectionRule,
  onChangeRule,
  onShuffle,
  observationCount,
  disabled = false,
}) => {
  return (
    <aside className="retro-card flex flex-col justify-between p-4 sm:p-5">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] pb-2">
          <span className="serif text-base font-bold text-[#242830] flex items-center gap-1.5">
            <SlidersHorizontal className="h-4 w-4 text-[#E85D16]" />
            Data Controls
          </span>
          <span className="retro-chip !text-[10px]">
            {observationCount} values
          </span>
        </div>

        {/* Dataset text area */}
        <div>
          <label className="retro-label block mb-1">
            Raw Dataset (comma or space separated)
          </label>
          <textarea
            value={rawInput}
            onChange={(e) => onChangeRaw(e.target.value)}
            disabled={disabled}
            rows={3}
            className="retro-input resize-none text-xs leading-relaxed"
            placeholder="e.g. 52, 55, 58, 62, 65, 98"
          />
        </div>

        {/* Target value input */}
        <div>
          <label className="retro-label block mb-1">
            Target Observation
          </label>
          <input
            type="number"
            value={targetValue}
            onChange={(e) => onChangeTarget(e.target.value)}
            disabled={disabled}
            className="retro-input text-base font-bold"
            placeholder="e.g. 98"
          />
        </div>

        {/* Detection rule toggle */}
        <div>
          <label className="retro-label block mb-1">
            Detection Rule
          </label>
          <div className="retro-seg w-full">
            <button
              type="button"
              className="flex-1 text-center py-2"
              data-active={detectionRule === 'iqr'}
              onClick={() => {
                sound.playPop();
                onChangeRule('iqr');
              }}
            >
              IQR × 1.5
            </button>
            <button
              type="button"
              className="flex-1 text-center py-2"
              data-active={detectionRule === 'zscore'}
              onClick={() => {
                sound.playPop();
                onChangeRule('zscore');
              }}
            >
              |Z-score| &gt; 2.0
            </button>
          </div>
          <p className="mt-1.5 text-[11px] text-[#6B7280]">
            {detectionRule === 'iqr'
              ? 'Fences = Q1 − 1.5×IQR and Q3 + 1.5×IQR'
              : 'Flags points exceeding 2 standard deviations from mean'}
          </p>
        </div>
      </div>

      {/* Shuffle button */}
      <div className="mt-5 pt-3 border-t-[1.5px] border-[#30343B]">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            onShuffle();
          }}
          className="retro-btn w-full"
        >
          <RefreshCw className="h-4 w-4 text-[#245D9C]" />
          Shuffle a New Dataset
        </button>
      </div>
    </aside>
  );
};
