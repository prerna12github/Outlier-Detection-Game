import React from 'react';
import { FileText, Download, X, ArrowLeft, ExternalLink } from 'lucide-react';
import { sound } from '../lib/sound';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const pdfUrl = '/Outlier_Hunt_Documentation.pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#242830]/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="retro-card relative max-w-5xl w-full my-4 p-5 sm:p-7 space-y-4 animate-in zoom-in-95 bg-[#FFFCF4] max-h-[92vh] flex flex-col shadow-[6px_6px_0px_#30343B]">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-[#30343B] pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="retro-btn !py-2 !px-3 !text-xs flex items-center gap-1.5"
              aria-label="Back to previous screen"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="retro-chip !bg-[#245D9C] !text-[#FFFCF4] flex items-center gap-1">
                  <FileText className="h-3 w-3" /> PDF PREVIEW
                </span>
                <span className="mono font-semibold text-xs text-[#242830] bg-[#F8F2E5] px-2 py-0.5 rounded border border-[#30343B]/30">
                  Outlier_Hunt_Documentation.pdf
                </span>
              </div>
              <h2 className="serif text-xl sm:text-2xl font-bold text-[#242830] mt-1">
                Outlier Hunt Documentation
              </h2>
            </div>
          </div>

          {/* Action Buttons: Download PDF and Close */}
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="Outlier_Hunt_Documentation.pdf"
              onClick={() => sound.playCorrect()}
              className="retro-btn retro-btn-primary !py-2 !px-4 !text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#30343B]"
              title="Download original Outlier_Hunt_Documentation.pdf"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn !py-2 !px-3 !text-xs hidden sm:flex items-center gap-1"
              title="Open PDF in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5 text-[#245D9C]" />
              <span>Open Tab</span>
            </a>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="retro-btn !p-2"
              aria-label="Close"
              title="Close Preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full min-h-[520px] sm:min-h-[620px] bg-[#F8F2E5] rounded-[4px] border-[1.5px] border-[#30343B] overflow-hidden relative">
          <object
            data={`${pdfUrl}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="w-full h-full min-h-[520px] sm:min-h-[620px]"
          >
            {/* Fallback iframe / message for browsers or mobile */}
            <iframe
              src={`${pdfUrl}#toolbar=1`}
              title="Outlier Hunt Documentation PDF"
              className="w-full h-full min-h-[520px] sm:min-h-[620px] border-0"
            >
              <div className="p-8 text-center space-y-4">
                <FileText className="h-12 w-12 mx-auto text-[#E85D16]" />
                <h3 className="serif text-lg font-bold text-[#242830]">
                  PDF Preview
                </h3>
                <p className="text-sm text-[#6B7280] max-w-md mx-auto">
                  Your browser does not support inline PDF viewing. You can download or view the document using the button below.
                </p>
                <a
                  href={pdfUrl}
                  download="Outlier_Hunt_Documentation.pdf"
                  className="retro-btn retro-btn-primary inline-flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              </div>
            </iframe>
          </object>
        </div>

        {/* Bottom Footer Actions */}
        <div className="pt-2 border-t-[1.5px] border-[#30343B] flex items-center justify-between text-xs text-[#6B7280]">
          <div className="flex items-center gap-2">
            <span className="mono">File: Outlier_Hunt_Documentation.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="Outlier_Hunt_Documentation.pdf"
              onClick={() => sound.playCorrect()}
              className="retro-btn retro-btn-primary !py-1.5 !px-3 !text-xs flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="retro-btn !py-1.5 !px-3 !text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
