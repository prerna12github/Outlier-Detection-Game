import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  X,
  BookOpen,
  Calculator,
  Layers,
  Terminal,
  ExternalLink,
  Printer,
  Sparkles,
  Shield,
  Target,
} from 'lucide-react';
import { sound } from '../lib/sound';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'modes' | 'math' | 'architecture' | 'docker' | 'raw'>('overview');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const rawMarkdown = `# 🔎 Outlier Hunt — Project Documentation
**Tagline:** Spot the Odd. Master the Data.
**License:** MIT License
**Live Demo:** https://outlier-hunt.prernabuilds.me
**Docker Image:** ghcr.io/prerna12github/outlier-hunt:1.1.0

---

## 1. Overview
Outlier Hunt is an interactive, game-based educational simulator built to teach outlier detection concepts.
It deliberately separates **categorical odd-one-out puzzles** (cognitive pattern recognition) from **statistical outlier detection** (quantitative data analysis).

### Core Highlights:
- 4 Game Modes: Quick Hunt, Category Clash, Number Detective, Data Scientist Challenge.
- Beginner to Expert difficulty scaling (Easy, Medium, Hard, Expert).
- Statistical methods: Mean, Median, Quartiles, Interquartile Range (IQR fences), and Standard Deviation Z-scores.
- 100% Client-side operation with offline browser localStorage persistence.
- Retro-editorial paper aesthetic inspired by scientific laboratory notebooks.

---

## 2. Game Modes
1. **Quick Hunt:**
   Short, mixed rounds designed for rapid pattern recognition across categorical and numerical items.
2. **Category Clash:**
   Semantic anomaly detection where players identify items violating shared taxonomy (fruits vs vegetables, animals vs plants, programming languages vs markup languages).
3. **Number Detective:**
   Identify numerical values that violate sequence logic, arithmetic progressions, or spacing patterns.
4. **Data Scientist Challenge:**
   Real-world distributions (temperatures, response times, sensor metrics) evaluated using Tukey IQR fences and Z-scores.

---

## 3. Mathematical & Detection Rules

### Interquartile Range (IQR) Method (Tukey's Fences)
- **IQR** = Q3 - Q1
- **Lower Fence** = Q1 - (1.5 × IQR)
- **Upper Fence** = Q3 + (1.5 × IQR)
- Any observation x < Lower Fence or x > Upper Fence is flagged as an outlier.

### Z-Score Standard Deviation Method
- **Formula:** Z = (x - μ) / σ
- where μ is the dataset mean and σ is the standard deviation.
- Observations with |Z| > 2 (or 3) are flagged as significant anomalies.

---

## 4. Technical Architecture
- **Framework:** React 19 + TypeScript
- **Routing:** TanStack Router with TanStack Start
- **Styling:** Tailwind CSS + Custom retro paper color tokens
- **Animations:** Framer Motion & CSS transitions
- **Audio:** Web Audio API synthesizer for zero-dependency sound effects
- **State & Storage:** React Hooks + browser localStorage
- **Containerization:** Multi-stage Docker/Podman packaging

---

## 5. Getting Started

### Local Development
\`\`\`bash
# 1. Clone the repository
git clone https://github.com/prerna12github/Outlier-Detection-Game.git
cd Outlier-Detection-Game/outlier-odyssey

# 2. Install dependencies
bun install

# 3. Start development server
bun run dev

# 4. Run tests
bun test

# 5. Production build
bun run build
\`\`\`

### Running with Docker / Podman
\`\`\`bash
podman pull ghcr.io/prerna12github/outlier-hunt:1.1.0
podman run -d --name outlier-hunt -p 3000:3000 ghcr.io/prerna12github/outlier-hunt:1.1.0
\`\`\`
Visit http://localhost:3000 to play!
`;

  const handleDownload = () => {
    sound.playCorrect();
    try {
      const blob = new Blob([rawMarkdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Outlier-Hunt-Documentation.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback to static public link
      window.open('/docs/Outlier-Hunt-Documentation.md', '_blank');
    }
  };

  const handleCopy = async () => {
    sound.playPop();
    try {
      await navigator.clipboard.writeText(rawMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#242830]/50 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="retro-card relative max-w-4xl w-full my-6 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 bg-[#FFFCF4] max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-[#30343B] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="retro-chip !bg-[#245D9C] !text-[#FFFCF4] flex items-center gap-1">
                <FileText className="h-3 w-3" /> TECHNICAL SPECIFICATION
              </span>
              <span className="retro-chip !py-0.5 !px-1.5 !text-[9px]">v1.1.0</span>
            </div>
            <h2 className="serif text-2xl sm:text-3xl font-extrabold text-[#242830] mt-1.5">
              Project Documentation
            </h2>
            <p className="hand text-lg text-[#245D9C] mt-0.5">
              Outlier Hunt: Spot the Odd. Master the Data.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleDownload}
              className="retro-btn retro-btn-primary !py-2 !px-3.5 !text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#30343B]"
              title="Download documentation as Markdown (.md)"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download (.md)</span>
            </button>

            <button
              onClick={handleCopy}
              className="retro-btn !py-2 !px-3 !text-xs flex items-center gap-1.5"
              title="Copy markdown content to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#218653]" />
                  <span className="text-[#218653] font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#6B7280]" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="retro-btn !py-2 !px-3 !text-xs hidden sm:flex items-center gap-1.5"
              title="Print documentation or Save as PDF"
            >
              <Printer className="h-3.5 w-3.5 text-[#6B7280]" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="retro-btn !p-2"
              aria-label="Close Documentation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b-[1.5px] border-[#30343B]/30 scrollbar-thin">
          {[
            { id: 'overview', label: '1. Overview', icon: <BookOpen className="h-3.5 w-3.5" /> },
            { id: 'modes', label: '2. Game Modes', icon: <Target className="h-3.5 w-3.5" /> },
            { id: 'math', label: '3. Math & Formulas', icon: <Calculator className="h-3.5 w-3.5" /> },
            { id: 'architecture', label: '4. Architecture', icon: <Layers className="h-3.5 w-3.5" /> },
            { id: 'docker', label: '5. Docker & Setup', icon: <Terminal className="h-3.5 w-3.5" /> },
            { id: 'raw', label: 'Raw Markdown', icon: <FileText className="h-3.5 w-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border-[1.5px] text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-[#30343B] bg-[#242830] text-[#FFFCF4] shadow-[2px_2px_0px_#30343B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#242830] hover:bg-[#F8F2E5]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 text-sm text-[#242830] leading-relaxed">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-4 shadow-[2px_2px_0px_#30343B]">
                <h3 className="serif text-lg font-bold text-[#242830] flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#E85D16]" /> Executive Summary
                </h3>
                <p className="mt-2 text-sm text-[#6B7280]">
                  <strong>OUTLIER HUNT</strong> is an educational data science game designed to demystify anomaly detection.
                  Players progress from intuitive qualitative puzzles (finding semantic oddities) to rigorous statistical tests
                  like Tukey’s Interquartile Range (IQR) fences and Z-scores.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="retro-card p-4 space-y-2">
                  <div className="retro-label text-[10px]">Methodology 1</div>
                  <h4 className="serif font-bold text-[#242830]">Categorical Pattern Recognition</h4>
                  <p className="text-xs text-[#6B7280]">
                    Evaluates items sharing common features (e.g. fruits, programming languages, currencies)
                    and tests the player’s ability to pinpoint the one element that violates the rule.
                  </p>
                </div>

                <div className="retro-card p-4 space-y-2">
                  <div className="retro-label text-[10px]">Methodology 2</div>
                  <h4 className="serif font-bold text-[#242830]">Quantitative Anomaly Detection</h4>
                  <p className="text-xs text-[#6B7280]">
                    Uses statistical metrics (mean, median, standard deviation, quartiles) to detect values
                    that lie unexpectedly far from the central tendency of the data.
                  </p>
                </div>
              </div>

              <div className="retro-card p-4 space-y-2">
                <h4 className="serif font-bold text-[#242830]">Key Features & Technical Pillars</h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-[#6B7280] marker:text-[#E85D16]">
                  <li><strong>Four Diverse Game Modes:</strong> Quick Hunt, Category Clash, Number Detective, and Data Scientist Challenge.</li>
                  <li><strong>Instant Mathematical Validation:</strong> Immediate explanations with Tukey fence and Z-score calculations.</li>
                  <li><strong>Interactive Visualizations:</strong> Dot-plots and charts highlighting distribution spread and fence bounds.</li>
                  <li><strong>Local Persistence:</strong> No cookies, accounts, or telemetry; all user high scores and session statistics remain in browser storage.</li>
                  <li><strong>Retro-Light Aesthetic:</strong> Scientific laboratory notebook styling with warm paper tones, dark borders, and bold offset shadows.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: GAME MODES */}
          {activeTab === 'modes' && (
            <div className="space-y-4">
              <div className="rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] p-3 text-xs text-[#6B7280]">
                Each mode comes with four progressive difficulty levels: <strong>Easy</strong>, <strong>Medium</strong>, <strong>Hard</strong>, and <strong>Expert</strong>.
              </div>

              <div className="space-y-3">
                <div className="retro-card p-4 border-l-4 border-l-[#245D9C]">
                  <div className="flex items-center justify-between">
                    <h4 className="serif text-base font-bold text-[#242830]">Mode A: Quick Hunt</h4>
                    <span className="retro-chip !text-[9px]">CASUAL / MIXED</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1.5">
                    Fast-paced sessions of 5 questions randomly pulled from both categorical and numerical banks.
                    Perfect for warm-ups and sharpening immediate reflex pattern detection.
                  </p>
                </div>

                <div className="retro-card p-4 border-l-4 border-l-[#E85D16]">
                  <div className="flex items-center justify-between">
                    <h4 className="serif text-base font-bold text-[#242830]">Mode B: Category Clash</h4>
                    <span className="retro-chip !text-[9px]">QUALITATIVE</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1.5">
                    Semantic challenges comparing taxonomic categories (fruits vs. vegetables, programming languages vs. markup languages, animals vs. plants).
                    Players must identify the item that does not share the underlying common property.
                  </p>
                </div>

                <div className="retro-card p-4 border-l-4 border-l-[#218653]">
                  <div className="flex items-center justify-between">
                    <h4 className="serif text-base font-bold text-[#242830]">Mode C: Number Detective</h4>
                    <span className="retro-chip !text-[9px]">NUMERICAL SEQUENCES</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1.5">
                    Players examine small sets of numbers (e.g. <code className="mono bg-[#F8F2E5] px-1 py-0.5 rounded">8, 9, 10, 11, 75</code>)
                    to identify outliers resulting from typos, measurement shifts, or extreme distance from the cluster.
                  </p>
                </div>

                <div className="retro-card p-4 border-l-4 border-l-[#242830]">
                  <div className="flex items-center justify-between">
                    <h4 className="serif text-base font-bold text-[#242830]">Mode D: Data Scientist Challenge</h4>
                    <span className="retro-chip !text-[9px]">APPLIED STATISTICS</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1.5">
                    Realistic real-world datasets (server latency spikes, temperatures, sensor readings, financial transactions)
                    accompanied by interactive charts, quartile breakdowns, IQR fences, and Z-scores.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MATH & FORMULAS */}
          {activeTab === 'math' && (
            <div className="space-y-4">
              <div className="retro-card p-5 space-y-3">
                <span className="retro-chip !bg-[#E85D16] !text-[#FFFCF4]">METHOD 1</span>
                <h4 className="serif text-lg font-bold text-[#242830]">
                  Tukey’s Interquartile Range (IQR) Fences
                </h4>
                <p className="text-xs text-[#6B7280]">
                  The IQR method is robust against extreme values because it is based on percentiles rather than the arithmetic mean.
                </p>

                <div className="bg-[#242830] text-[#FFFCF4] p-3.5 rounded-[4px] font-mono text-xs space-y-1">
                  <div>IQR = Q3 - Q1</div>
                  <div>Lower Fence = Q1 - 1.5 × IQR</div>
                  <div>Upper Fence = Q3 + 1.5 × IQR</div>
                </div>

                <p className="text-xs text-[#6B7280]">
                  Any observation <code className="mono text-[#E85D16] font-semibold">x &lt; Lower Fence</code> or{' '}
                  <code className="mono text-[#E85D16] font-semibold">x &gt; Upper Fence</code> is classified as an outlier.
                </p>
              </div>

              <div className="retro-card p-5 space-y-3">
                <span className="retro-chip !bg-[#245D9C] !text-[#FFFCF4]">METHOD 2</span>
                <h4 className="serif text-lg font-bold text-[#242830]">
                  Z-Score Standard Deviation Test
                </h4>
                <p className="text-xs text-[#6B7280]">
                  The Z-score quantifies how many standard deviations an observation falls away from the dataset mean.
                </p>

                <div className="bg-[#242830] text-[#FFFCF4] p-3.5 rounded-[4px] font-mono text-xs space-y-1">
                  <div>Z = (x - μ) / σ</div>
                  <div>where μ = Mean, σ = Standard Deviation</div>
                  <div>Decision: Flag if |Z| &gt; 2 (or |Z| &gt; 3 for conservative thresholds)</div>
                </div>

                <div className="p-3 bg-[#F4C5A5]/30 rounded-[4px] border border-[#E85D16]/30 text-xs text-[#242830]">
                  <strong>Note:</strong> Not every unusual observation indicates erroneous data. Outlier analysis always requires context and domain understanding.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="retro-card p-5 space-y-3">
                <h4 className="serif text-base font-bold text-[#242830]">Client-Side Only Architecture</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Outlier Hunt operates completely on the frontend. There are no tracking scripts, third-party databases, or authentication dependencies.
                  Calculations and validations execute locally in your web browser.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="rounded-[4px] border border-[#30343B] bg-[#F8F2E5] p-2.5">
                    <div className="mono text-[10px] text-[#6B7280]">RUNTIME</div>
                    <div className="font-bold text-xs text-[#242830]">Bun + React 19</div>
                  </div>
                  <div className="rounded-[4px] border border-[#30343B] bg-[#F8F2E5] p-2.5">
                    <div className="mono text-[10px] text-[#6B7280]">ROUTER</div>
                    <div className="font-bold text-xs text-[#242830]">TanStack Router</div>
                  </div>
                  <div className="rounded-[4px] border border-[#30343B] bg-[#F8F2E5] p-2.5">
                    <div className="mono text-[10px] text-[#6B7280]">STYLING</div>
                    <div className="font-bold text-xs text-[#242830]">Tailwind CSS</div>
                  </div>
                  <div className="rounded-[4px] border border-[#30343B] bg-[#F8F2E5] p-2.5">
                    <div className="mono text-[10px] text-[#6B7280]">VISUALS</div>
                    <div className="font-bold text-xs text-[#242830]">Recharts + SVG</div>
                  </div>
                  <div className="rounded-[4px] border border-[#30343B] bg-[#F8F2E5] p-2.5">
                    <div className="mono text-[10px] text-[#6B7280]">PERSISTENCE</div>
                    <div className="font-bold text-xs text-[#242830]">Browser localStorage</div>
                  </div>
                  <div className="rounded-[4px] border border-[#30343B] bg-[#F8F2E5] p-2.5">
                    <div className="mono text-[10px] text-[#6B7280]">AUDIO</div>
                    <div className="font-bold text-xs text-[#242830]">Web Audio API</div>
                  </div>
                </div>
              </div>

              <div className="retro-card p-4 space-y-2">
                <h4 className="serif font-bold text-[#242830]">Security & Privacy Profile</h4>
                <div className="flex items-start gap-2 text-xs text-[#6B7280]">
                  <Shield className="h-4 w-4 text-[#218653] shrink-0 mt-0.5" />
                  <span>
                    Zero telemetry and zero external network calls during gameplay. All personal statistics (scores, streaks, history)
                    remain safely inside your browser’s isolated local storage.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DOCKER & SETUP */}
          {activeTab === 'docker' && (
            <div className="space-y-4">
              <div className="retro-card p-4 space-y-3">
                <h4 className="serif font-bold text-[#242830]">Run with Podman or Docker</h4>
                <p className="text-xs text-[#6B7280]">
                  Run the official container directly without installing Node or Bun:
                </p>

                <pre className="bg-[#242830] text-[#FFFCF4] p-3 rounded-[4px] font-mono text-xs overflow-x-auto">
{`# 1. Pull container image
podman pull ghcr.io/prerna12github/outlier-hunt:1.1.0

# 2. Run container on port 3000
podman run -d --name outlier-hunt -p 3000:3000 ghcr.io/prerna12github/outlier-hunt:1.1.0`}
                </pre>
              </div>

              <div className="retro-card p-4 space-y-3">
                <h4 className="serif font-bold text-[#242830]">Local Source Setup</h4>
                <pre className="bg-[#242830] text-[#FFFCF4] p-3 rounded-[4px] font-mono text-xs overflow-x-auto">
{`git clone https://github.com/prerna12github/Outlier-Detection-Game.git
cd Outlier-Detection-Game/outlier-odyssey
bun install
bun run dev`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 6: RAW MARKDOWN */}
          {activeTab === 'raw' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span>Complete markdown file for documentation & export</span>
                <button
                  onClick={handleCopy}
                  className="retro-btn !py-1 !px-2.5 !text-xs flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copied ? 'Copied!' : 'Copy Raw Markdown'}</span>
                </button>
              </div>
              <pre className="bg-[#242830] text-[#FFFCF4] p-4 rounded-[4px] font-mono text-xs max-h-[380px] overflow-y-auto whitespace-pre-wrap selection:bg-[#E85D16]">
                {rawMarkdown}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-3 border-t-[1.5px] border-[#30343B] flex flex-wrap items-center justify-between gap-3 bg-[#FFFCF4]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="retro-btn retro-btn-primary !py-2 !px-4 !text-xs flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Download Full Documentation (.md)
            </button>
            <a
              href="/docs/Outlier-Hunt-Documentation.md"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn !py-2 !px-3 !text-xs flex items-center gap-1.5"
            >
              <ExternalLink className="h-3.5 w-3.5 text-[#245D9C]" />
              Direct File Link
            </a>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="retro-btn !py-2 !px-4 !text-xs"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
