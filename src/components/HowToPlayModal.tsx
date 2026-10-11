import React from 'react';
import { sound } from '../lib/sound';
import { HowToPlayView } from './HowToPlayView';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#242830]/50 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative max-w-4xl w-full my-6 animate-in zoom-in-95">
        {/* Floating Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute -top-3 -right-3 z-10 retro-btn !p-2 !bg-[#FFFCF4] shadow-[3px_3px_0px_#30343B]"
          aria-label="Close Tutorial"
        >
          <X className="h-5 w-5 text-[#242830]" />
        </button>

        {/* Rich How-To-Play View Component */}
        <div className="max-h-[85vh] overflow-y-auto pr-1">
          <HowToPlayView
            isModal={true}
            onClose={onClose}
            onStartPlaying={() => {
              onClose();
              onStartPlaying();
            }}
          />
        </div>
      </div>
    </div>
  );
};
