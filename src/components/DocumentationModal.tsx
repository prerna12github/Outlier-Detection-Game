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
  Eye,
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
  const [activeTab, setActiveTab] = useState<'preview' | 'overview' | 'modes' | 'math' | 'architecture' | 'docker' | 'raw'>('preview');
  const [previewMode, setPreviewMode] = useState<'rendered' | 'raw'>('rendered');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const rawMarkdown = `# 🔎 Outlier Hunt — Project Documentation (outlier_hunt_documentation.md)
**Tagline:** Spot the Odd. Master the Data.  
**Version:** 1.1.0  
**License:** MIT License  
**Live Demo:** https://outlier-hunt.prernabuilds.me  
**Docker Image:** ghcr.io/prerna12github/outlier-hunt:1.1.0  

---

## 1. Overview
Outlier Hunt turns outlier detection into an engaging, interactive educational game. Players start with simple categorical odd-one-out puzzles and gradually advance to numerical datasets and rigorous statistical challenges.

The application deliberately separates:
1. **Categorical odd-one-out puzzles** (cognitive pattern recognition, semantic categories)
2. **Statistical outlier detection** (quantitative data analysis, IQR, Z-scores)

---

## 2. Features
- **4 Game Modes:** Quick Hunt, Category Clash, Number Detective, Data Scientist Challenge.
- **Progressive Difficulty Levels:** Easy, Medium, Hard, Expert.
- **Statistical Methods:** Mean, Median, Quartiles, Interquartile Range (IQR fences), and Standard Deviation Z-scores.
- **Visual Analytics:** Interactive dot-plots and distribution boundaries with anomaly highlight pins.
- **Pedagogical Explanations:** Real-time feedback with mathematical breakdown after each round.
- **100% Client-Side:** No backend, database, cookies, or tracking. Personal bests and streaks persist in browser localStorage.
- **Retro-Light Aesthetic:** Elegant vintage scientific notebook styling with warm paper backgrounds (#F8F2E5, #FFFCF4), dark charcoal borders (#30343B), and hard offset shadows.

---

## 3. Game Modes

| Mode | Type | Description |
|---|---|---|
| **Quick Hunt** | Mixed | Rapid 5-question rounds mixing categorical and numerical oddities. |
| **Category Clash** | Qualitative | Identify the item violating the common category (fruits vs. vegetables, programming vs. markup). |
| **Number Detective** | Sequences | Spot numerical values that break sequence patterns or cluster boundaries. |
| **Data Scientist Challenge** | Applied Statistics | Real-world telemetry (latencies, temperatures, sensors) solved using IQR fences and Z-scores. |

---

## 4. Mathematical Detection Rules

### Interquartile Range (IQR) Method (Tukey's Fences)
The IQR method relies on percentiles and is robust against extreme values.
\`\`\`text
IQR         = Q3 - Q1
Lower Fence = Q1 - (1.5 × IQR)
Upper Fence = Q3 + (1.5 × IQR)
\`\`\`
Any value smaller than Lower Fence or larger than Upper Fence is flagged as an outlier.

### Z-Score Standard Deviation Method
The Z-score measures how many standard deviations an observation lies from the distribution mean.
\`\`\`text
Z = (x - μ) / σ
\`\`\`
where:
- x = observation value
- μ = dataset arithmetic mean
- σ = standard deviation

Observations with |Z| > 2 (or 3) are flagged as statistically significant outliers.

---

## 5. Technology Stack & Architecture
- **Framework:** React 19 with TypeScript
- **Routing:** TanStack Router & TanStack Start
- **Styling:** Tailwind CSS + custom retro-paper CSS custom properties
- **Icons & Motion:** Lucide React & Framer Motion
- **Visualization:** Recharts & Vector SVG graphics
- **Audio:** Web Audio API synthesizer for zero-dependency sound effects
- **Local Persistence:** Browser localStorage with offline resilience

---

## 6. Getting Started & Running

### Local Development
\`\`\`bash
# 1. Clone repository
git clone https://github.com/prerna12github/Outlier-Detection-Game.git
cd Outlier-Detection-Game/outlier-odyssey

# 2. Install dependencies
bun install

# 3. Start local development server
bun run dev

# 4. Run test suite
bun test

# 5. Production build
bun run build
\`\`\`

### Running with Docker or Podman
\`\`\`bash
podman pull ghcr.io/prerna12github/outlier-hunt:1.1.0
podman run -d --name outlier-hunt -p 3000:3000 ghcr.io/prerna12github/outlier-hunt:1.1.0
\`\`\`
Open http://localhost:3000 in your browser to play!
`;

  const handleDownload = () => {
    sound.playCorrect();
    try {
      const blob = new Blob([rawMarkdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'outlier_hunt_documentation.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/outlier_hunt_documentation.md', '_blank');
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
      <div className="retro-card relative max-w-5xl w-full my-6 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 bg-[#FFFCF4] max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-[#30343B] pb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="retro-chip !bg-[#245D9C] !text-[#FFFCF4] flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" /> DOCUMENTATION PREVIEW
              </span>
              <span className="mono font-bold text-xs bg-[#E85D16] text-[#FFFCF4] px-2 py-0.5 rounded shadow-[1px_1px_0px_#30343B]">
                outlier_hunt_documentation.md
              </span>
              <span className="retro-chip !py-0.5 !px-1.5 !text-[9px]">v1.1.0</span>
            </div>
            <h2 className="serif text-2xl sm:text-3xl font-extrabold text-[#242830] mt-1.5 flex items-center gap-2">
              <span>Project Documentation</span>
              <span className="text-base font-normal hand text-[#E85D16]">"Spot the Odd. Master the Data."</span>
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleDownload}
              className="retro-btn retro-btn-primary !py-2 !px-3.5 !text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#30343B]"
              title="Download outlier_hunt_documentation.md"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download (.md)</span>
            </button>

            <button
              onClick={handleCopy}
              className="retro-btn !py-2 !px-3 !text-xs flex items-center gap-1.5"
              title="Copy markdown text to clipboard"
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
              title="Print documentation or save as PDF"
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
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 border-b-[1.5px] border-[#30343B]/30 scrollbar-thin">
          <div className="flex items-center gap-1.5 flex-nowrap">
            {[
              { id: 'preview', label: '📄 Document Preview', icon: <Eye className="h-3.5 w-3.5" /> },
              { id: 'overview', label: '1. Overview', icon: <BookOpen className="h-3.5 w-3.5" /> },
              { id: 'modes', label: '2. Game Modes', icon: <Target className="h-3.5 w-3.5" /> },
              { id: 'math', label: '3. Math & Formulas', icon: <Calculator className="h-3.5 w-3.5" /> },
              { id: 'architecture', label: '4. Architecture', icon: <Layers className="h-3.5 w-3.5" /> },
              { id: 'docker', label: '5. Docker & Setup', icon: <Terminal className="h-3.5 w-3.5" /> },
              { id: 'raw', label: 'Raw Markdown (.md)', icon: <FileText className="h-3.5 w-3.5" /> },
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

          {/* Switch preview mode if on preview tab */}
          {activeTab === 'preview' && (
            <div className="hidden sm:flex items-center gap-1 bg-[#F8F2E5] p-0.5 rounded border border-[#30343B]">
              <button
                onClick={() => setPreviewMode('rendered')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                  previewMode === 'rendered' ? 'bg-[#FFFCF4] text-[#242830] font-bold shadow-xs' : 'text-[#6B7280]'
                }`}
              >
                Formatted View
              </button>
              <button
                onClick={() => setPreviewMode('raw')}
                className={`px-2 py-0.5 text-[11px] font-medium rounded ${
                  previewMode === 'raw' ? 'bg-[#FFFCF4] text-[#242830] font-bold shadow-xs' : 'text-[#6B7280]'
                }`}
              >
                Code View
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm text-[#242830] leading-relaxed">
          {/* TAB 0: COMPLETE DOCUMENT PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {previewMode === 'raw' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="mono">outlier_hunt_documentation.md (Markdown source)</span>
                    <button onClick={handleCopy} className="retro-btn !py-1 !px-2.5 !text-xs flex items-center gap-1">
                      <Copy className="h-3 w-3" />
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="bg-[#242830] text-[#FFFCF4] p-4 rounded-[4px] font-mono text-xs max-h-[480px] overflow-y-auto whitespace-pre-wrap selection:bg-[#E85D16]">
                    {rawMarkdown}
                  </pre>
                </div>
              ) : (
                <article className="space-y-6 bg-[#FFFCF4] rounded-[4px]">
                  {/* Article Document Header */}
                  <div className="border-b-[1.5px] border-[#30343B] pb-5 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="mono text-xs text-[#6B7280] bg-[#F8F2E5] px-2.5 py-1 rounded border border-[#30343B]/30">
                        📄 File: outlier_hunt_documentation.md
                      </span>
                      <span className="retro-chip !bg-[#218653] !text-[#FFFCF4]">STATUS: PRODUCTION READY</span>
                    </div>

                    <h1 className="serif text-3xl sm:text-4xl font-extrabold text-[#242830]">
                      🔎 Outlier Hunt Documentation
                    </h1>
                    <p className="hand text-2xl text-[#245D9C]">
                      Spot the Odd. Master the Data.
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      An educational game-based outlier detection simulator created for exploring qualitative odd-one-out puzzles, numerical sequences, and statistical Tukey fences &amp; Z-scores.
                    </p>
                  </div>

                  {/* Quick Table of Contents Preview */}
                  <div className="p-4 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5] space-y-2">
                    <div className="retro-label !text-[11px] text-[#242830]">TABLE OF CONTENTS</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <button onClick={() => setActiveTab('overview')} className="text-left font-medium text-[#245D9C] hover:underline">
                        → 1. Overview &amp; Concept
                      </button>
                      <button onClick={() => setActiveTab('modes')} className="text-left font-medium text-[#245D9C] hover:underline">
                        → 2. Game Modes
                      </button>
                      <button onClick={() => setActiveTab('math')} className="text-left font-medium text-[#245D9C] hover:underline">
                        → 3. Math &amp; Formulas
                      </button>
                      <button onClick={() => setActiveTab('architecture')} className="text-left font-medium text-[#245D9C] hover:underline">
                        → 4. Architecture
                      </button>
                      <button onClick={() => setActiveTab('docker')} className="text-left font-medium text-[#245D9C] hover:underline">
                        → 5. Docker &amp; Setup
                      </button>
                      <button onClick={() => setActiveTab('raw')} className="text-left font-medium text-[#245D9C] hover:underline">
                        → 6. Raw Markdown
                      </button>
                    </div>
                  </div>

                  {/* Section 1: Overview */}
                  <section className="space-y-3">
                    <h3 className="serif text-xl font-bold text-[#242830] flex items-center gap-2 border-b border-[#30343B]/20 pb-1.5">
                      <Sparkles className="h-4 w-4 text-[#E85D16]" /> 1. Overview &amp; Educational Vision
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      OUTLIER HUNT turns data anomaly detection into an intuitive, gamified experience.
                      It starts with intuitive cognitive pattern recognition (spotting semantic discrepancies like an animal among countries)
                      and progressively introduces rigorous numerical calculations (detecting values exceeding 1.5 × IQR fences or |Z| &gt; 2).
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 pt-1">
                      <div className="retro-card p-3 space-y-1">
                        <div className="retro-label text-[10px]">CATEGORY PUZZLES</div>
                        <div className="font-semibold text-xs text-[#242830]">Pattern Recognition</div>
                        <p className="text-[11px] text-[#6B7280]">
                          Semantic boundaries (taxonomies, languages, foods, geographical units).
                        </p>
                      </div>
                      <div className="retro-card p-3 space-y-1">
                        <div className="retro-label text-[10px]">STATISTICAL TESTS</div>
                        <div className="font-semibold text-xs text-[#242830]">Quantitative Detection</div>
                        <p className="text-[11px] text-[#6B7280]">
                          Tukey fences, Z-score standard deviation, distributions, and quartiles.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Section 2: Game Modes Summary */}
                  <section className="space-y-3">
                    <h3 className="serif text-xl font-bold text-[#242830] flex items-center gap-2 border-b border-[#30343B]/20 pb-1.5">
                      <Target className="h-4 w-4 text-[#E85D16]" /> 2. Four Interactive Game Modes
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="retro-card p-3.5 space-y-1.5 border-l-4 border-l-[#245D9C]">
                        <span className="retro-label text-[10px]">MODE A</span>
                        <h4 className="serif font-bold text-[#242830]">Quick Hunt</h4>
                        <p className="text-xs text-[#6B7280]">Fast-paced rounds combining categorical and numerical oddities for quick reflexes.</p>
                      </div>
                      <div className="retro-card p-3.5 space-y-1.5 border-l-4 border-l-[#E85D16]">
                        <span className="retro-label text-[10px]">MODE B</span>
                        <h4 className="serif font-bold text-[#242830]">Category Clash</h4>
                        <p className="text-xs text-[#6B7280]">Semantic taxonomy questions (fruits vs. vegetables, programming vs. markup).</p>
                      </div>
                      <div className="retro-card p-3.5 space-y-1.5 border-l-4 border-l-[#218653]">
                        <span className="retro-label text-[10px]">MODE C</span>
                        <h4 className="serif font-bold text-[#242830]">Number Detective</h4>
                        <p className="text-xs text-[#6B7280]">Numerical sequences, arithmetic progressions, and distance-from-cluster anomalies.</p>
                      </div>
                      <div className="retro-card p-3.5 space-y-1.5 border-l-4 border-l-[#242830]">
                        <span className="retro-label text-[10px]">MODE D</span>
                        <h4 className="serif font-bold text-[#242830]">Data Scientist Challenge</h4>
                        <p className="text-xs text-[#6B7280]">Real datasets with dot plots, quartiles, Tukey fences, and Z-score calculations.</p>
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Math Summary */}
                  <section className="space-y-3">
                    <h3 className="serif text-xl font-bold text-[#242830] flex items-center gap-2 border-b border-[#30343B]/20 pb-1.5">
                      <Calculator className="h-4 w-4 text-[#E85D16]" /> 3. Detection Rules &amp; Formulas
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="bg-[#242830] text-[#FFFCF4] p-4 rounded-[4px] space-y-2 font-mono text-xs">
                        <div className="text-[#F4C5A5] font-bold">Tukey Interquartile Range:</div>
                        <div>IQR = Q3 - Q1</div>
                        <div>Lower Fence = Q1 - 1.5 × IQR</div>
                        <div>Upper Fence = Q3 + 1.5 × IQR</div>
                        <div className="text-[#6B7280] text-[10px]">Robust against extreme values</div>
                      </div>
                      <div className="bg-[#242830] text-[#FFFCF4] p-4 rounded-[4px] space-y-2 font-mono text-xs">
                        <div className="text-[#F4C5A5] font-bold">Z-Score Standard Deviation:</div>
                        <div>Z = (x - μ) / σ</div>
                        <div>μ = Mean, σ = Std Deviation</div>
                        <div>Threshold: |Z| &gt; 2 or |Z| &gt; 3</div>
                        <div className="text-[#6B7280] text-[10px]">Standardized distance from mean</div>
                      </div>
                    </div>
                  </section>
                </article>
              )}
            </div>
          )}

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
                <h4 className="serif font-bold text-[#242830]">Key Features &amp; Technical Pillars</h4>
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
                <h4 className="serif font-bold text-[#242830]">Security &amp; Privacy Profile</h4>
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
                <span>Complete markdown file for documentation &amp; export</span>
                <button
                  onClick={handleCopy}
                  className="retro-btn !py-1 !px-2.5 !text-xs flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copied ? 'Copied!' : 'Copy Raw Markdown'}</span>
                </button>
              </div>
              <pre className="bg-[#242830] text-[#FFFCF4] p-4 rounded-[4px] font-mono text-xs max-h-[420px] overflow-y-auto whitespace-pre-wrap selection:bg-[#E85D16]">
                {rawMarkdown}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-3 border-t-[1.5px] border-[#30343B] flex flex-wrap items-center justify-between gap-3 bg-[#FFFCF4]">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownload}
              className="retro-btn retro-btn-primary !py-2 !px-4 !text-xs flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Download outlier_hunt_documentation.md
            </button>
            <a
              href="/outlier_hunt_documentation.md"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn !py-2 !px-3 !text-xs flex items-center gap-1.5"
              title="Open raw markdown file directly in new tab"
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
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
