import React from 'react';
import { sound } from '../lib/sound';
import { Eye, Search, GraduationCap, X, CheckCircle, Calculator } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPlaying: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  onStartPlaying,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#242830]/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="retro-card max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] pb-3">
          <div className="flex items-center gap-2">
            <span className="retro-chip !bg-[#E85D16] !text-[#FFFCF4]">TUTORIAL</span>
            <h2 className="serif text-2xl font-bold text-[#242830]">
              How to Play Outlier Hunt
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="retro-btn !p-1.5"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 3 Steps */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F4C5A5] text-[#242830] font-bold mono">
              1
            </div>
            <div>
              <h3 className="serif text-base font-bold text-[#242830] flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-[#245D9C]" /> 1. OBSERVE
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 leading-relaxed">
                Scan the group of entities, numerical series, or scientific chart. Note the central baseline, cluster density, or conceptual taxonomy.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F4C5A5] text-[#242830] font-bold mono">
              2
            </div>
            <div>
              <h3 className="serif text-base font-bold text-[#242830] flex items-center gap-1.5">
                <Search className="h-4 w-4 text-[#E85D16]" /> 2. DETECT
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 leading-relaxed">
                Spot the observation that doesn’t fit:
                <br />
                • In <strong>Categorical</strong>: Spot the entity in a different class (e.g. carrot among fruits).
                <br />
                • In <strong>Numerical</strong>: Locate the value distant from the cluster (e.g. 75 in 8, 9, 10, 11, 75).
                <br />
                • In <strong>Statistical</strong>: Check whether the target point exceeds the $1.5 \times \text{IQR}$ fences or $\pm 2\sigma$ Z-scores.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F4C5A5] text-[#242830] font-bold mono">
              3
            </div>
            <div>
              <h3 className="serif text-base font-bold text-[#242830] flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-[#218653]" /> 3. LEARN
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 leading-relaxed">
                Review the post-round analysis. Every question provides clear rationale explaining the shared pattern of the inliers and the mathematical reason for the outlier.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Example Boxes */}
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-[4px] border-[1px] border-[#30343B] bg-[#F8F2E5]">
            <span className="retro-label !text-[9px] block mb-1">Categorical Example</span>
            <div className="font-semibold text-[#242830]">
              🍎 Apple, 🍌 Banana, 🥭 Mango, 🥕 Carrot
            </div>
            <p className="text-[#6B7280] mt-1">
              → <strong>Carrot</strong> is the outlier (root vegetable vs tree fruits).
            </p>
          </div>

          <div className="p-3 rounded-[4px] border-[1px] border-[#30343B] bg-[#F8F2E5]">
            <span className="retro-label !text-[9px] block mb-1">Numerical Example</span>
            <div className="font-semibold text-[#242830]">
              8, 9, 10, 11, <span className="text-[#E85D16]">75</span>
            </div>
            <p className="text-[#6B7280] mt-1">
              → <strong>75</strong> is over 60 units higher than the tight 8–11 cluster.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-end gap-3 pt-3 border-t-[1.5px] border-[#30343B]">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="retro-btn"
          >
            Close
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
              onStartPlaying();
            }}
            className="retro-btn retro-btn-primary !py-2.5 !px-6"
          >
            GOT IT, LET'S PLAY!
          </button>
        </div>
      </div>
    </div>
  );
};
