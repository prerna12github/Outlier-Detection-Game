import React, { useState } from 'react';
import { sound } from '../lib/sound';
import {
  Eye,
  Search,
  GraduationCap,
  Sparkles,
  Calculator,
  Compass,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  Zap,
  Tag,
  Hash,
  Microscope,
  ArrowRight,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface HowToPlayViewProps {
  onStartPlaying: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const HowToPlayView: React.FC<HowToPlayViewProps> = ({
  onStartPlaying,
  isModal = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'basics' | 'practice' | 'modes' | 'formulas' | 'scoring'>('basics');

  // Interactive Practice State 1: Categorical
  const [catSelected, setCatSelected] = useState<string | null>(null);
  // Interactive Practice State 2: Numerical
  const [numSelected, setNumSelected] = useState<number | null>(null);

  const tabs: Array<{ id: 'basics' | 'practice' | 'modes' | 'formulas' | 'scoring'; label: string; icon: React.ReactNode }> = [
    { id: 'basics', label: '1. The 3 Steps', icon: <Eye className="h-4 w-4" /> },
    { id: 'practice', label: '2. Interactive Practice', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'modes', label: '3. Game Modes', icon: <Compass className="h-4 w-4" /> },
    { id: 'formulas', label: '4. Formulas & Math', icon: <Calculator className="h-4 w-4" /> },
    { id: 'scoring', label: '5. Scoring & Honors', icon: <Award className="h-4 w-4" /> },
  ];

  return (
    <div className={`space-y-6 ${isModal ? '' : 'max-w-5xl mx-auto py-6'}`}>
      {/* Editorial Header Banner */}
      <div className="retro-card p-6 sm:p-8 bg-[#FFFCF4]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-[#30343B] pb-4">
          <div>
            <span className="retro-chip inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[#E85D16]" />
              FIELD INVESTIGATOR'S MANUAL
            </span>
            <h1 className="serif text-3xl sm:text-4xl font-extrabold text-[#242830] mt-2">
              How to Play Outlier Hunt
            </h1>
            <p className="hand text-2xl text-[#245D9C] mt-0.5">
              Spot the Odd. Master the Data.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playPop();
                onStartPlaying();
              }}
              className="retro-btn retro-btn-primary !py-2.5 !px-5"
            >
              GOT IT, LET'S PLAY! <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(tab.id);
                }}
                className={`retro-btn !py-1.5 !px-3.5 !text-xs flex items-center gap-1.5 ${
                  isActive ? '!bg-[#242830] !text-[#FFFCF4] shadow-[3px_3px_0px_#242830]' : ''
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: THE 3-STEP ROUTINE */}
      {activeTab === 'basics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid gap-5 md:grid-cols-3">
            {/* Step 1 */}
            <div className="retro-card p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F4C5A5] text-[#242830] font-bold mono text-lg shadow-[2px_2px_0px_#30343B]">
                    01
                  </div>
                  <span className="retro-chip !text-[9px]">STEP ONE</span>
                </div>

                <h3 className="serif text-xl font-bold text-[#242830] mt-4 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-[#245D9C]" /> 1. OBSERVE
                </h3>

                <p className="text-sm text-[#6B7280] leading-relaxed mt-2">
                  Examine the group of items, sequence of numbers, or scientific chart without rushing.
                </p>

                <ul className="text-xs text-[#242830] mt-3 space-y-1.5 list-disc list-inside">
                  <li>Identify the <strong>baseline pattern</strong> or common group.</li>
                  <li>Notice the <strong>spread and clusters</strong> in the data.</li>
                  <li>Scan for qualitative categories or numerical scales.</li>
                </ul>
              </div>

              <div className="p-2.5 rounded-[4px] border-[1px] border-[#30343B]/30 bg-[#F8F2E5] text-xs">
                <span className="retro-label !text-[9px] block">Tip:</span>
                <span className="italic text-[#6B7280]">"Every dataset tells a story — find what the normal entries share."</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="retro-card p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#E85D16] text-[#FFFCF4] font-bold mono text-lg shadow-[2px_2px_0px_#30343B]">
                    02
                  </div>
                  <span className="retro-chip !text-[9px] !bg-[#E85D16] !text-[#FFFCF4]">STEP TWO</span>
                </div>

                <h3 className="serif text-xl font-bold text-[#242830] mt-4 flex items-center gap-2">
                  <Search className="h-5 w-5 text-[#E85D16]" /> 2. DETECT
                </h3>

                <p className="text-sm text-[#6B7280] leading-relaxed mt-2">
                  Identify the specific observation that violates the rules of the group.
                </p>

                <ul className="text-xs text-[#242830] mt-3 space-y-1.5 list-disc list-inside">
                  <li><strong>Categorical:</strong> Item in another taxonomy class (e.g. vegetable among fruits).</li>
                  <li><strong>Numerical:</strong> Wild gap from the cluster (e.g. 75 in 8, 9, 10, 11).</li>
                  <li><strong>Statistical:</strong> Value beyond Tukey fences (1.5 × IQR) or |Z| &gt; 2.</li>
                </ul>
              </div>

              <div className="p-2.5 rounded-[4px] border-[1px] border-[#30343B]/30 bg-[#F8F2E5] text-xs">
                <span className="retro-label !text-[9px] block">Tip:</span>
                <span className="italic text-[#6B7280]">"Make your call before checking the mathematical boundaries."</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="retro-card p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#218653] text-[#FFFCF4] font-bold mono text-lg shadow-[2px_2px_0px_#30343B]">
                    03
                  </div>
                  <span className="retro-chip !text-[9px] !bg-[#218653] !text-[#FFFCF4]">STEP THREE</span>
                </div>

                <h3 className="serif text-xl font-bold text-[#242830] mt-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-[#218653]" /> 3. LEARN
                </h3>

                <p className="text-sm text-[#6B7280] leading-relaxed mt-2">
                  Read the detective explanation immediately following your call.
                </p>

                <ul className="text-xs text-[#242830] mt-3 space-y-1.5 list-disc list-inside">
                  <li>Learn <strong>why</strong> the item is distinct from the group.</li>
                  <li>Review the <strong>exact statistics</strong>: Mean, Median, σ, IQR, Fences.</li>
                  <li>Build real mental models used by working data scientists.</li>
                </ul>
              </div>

              <div className="p-2.5 rounded-[4px] border-[1px] border-[#30343B]/30 bg-[#F8F2E5] text-xs">
                <span className="retro-label !text-[9px] block">Tip:</span>
                <span className="italic text-[#6B7280]">"Explanations accompany every round, right or wrong."</span>
              </div>
            </div>
          </div>

          {/* Categorical vs Statistical Distinction Card */}
          <div className="retro-card p-6 space-y-4">
            <div className="flex items-center gap-2 border-b-[1.5px] border-[#30343B] pb-3">
              <span className="serif text-xl font-bold text-[#242830]">
                Critical Distinction: Categorical vs Statistical Outliers
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="p-4 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="retro-chip !bg-[#245D9C] !text-[#FFFCF4]">QUALITATIVE</span>
                  <Tag className="h-4 w-4 text-[#245D9C]" />
                </div>
                <h4 className="serif text-lg font-bold text-[#242830]">
                  Categorical Outlier
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  An item that violates conceptual classification, taxonomy, physical medium, or purpose.
                </p>
                <div className="p-2.5 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20 text-xs">
                  <strong>Classic Example:</strong> Python, Java, C++, HTML.
                  <br />
                  <span className="text-[#E85D16] font-semibold">→ HTML is the outlier</span> because it is a document markup syntax, while the others are Turing-complete programming languages.
                </div>
              </div>

              <div className="p-4 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="retro-chip !bg-[#E85D16] !text-[#FFFCF4]">QUANTITATIVE</span>
                  <Calculator className="h-4 w-4 text-[#E85D16]" />
                </div>
                <h4 className="serif text-lg font-bold text-[#242830]">
                  Statistical Outlier
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                  A numerical value unusually distant from the distribution under mathematical rules like IQR fences or Z-scores.
                </p>
                <div className="p-2.5 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20 text-xs">
                  <strong>Classic Example:</strong> 8, 9, 10, 11, 75.
                  <br />
                  <span className="text-[#E85D16] font-semibold">→ 75 is the outlier</span> because the first four numbers form a consecutive integer cluster spanning 3 units, while 75 is over 60 units away.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE PRACTICE SANDBOX */}
      {activeTab === 'practice' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="retro-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] pb-3">
              <div>
                <span className="retro-label">Practice Drill #1</span>
                <h3 className="serif text-xl font-bold text-[#242830]">
                  Interactive Categorical Challenge
                </h3>
              </div>
              <span className="hand text-lg text-[#245D9C]">Click an item below!</span>
            </div>

            <p className="text-xs sm:text-sm text-[#6B7280]">
              Which item does not belong to the culinary fruit group?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'apple', label: 'Apple', icon: '🍎', isOutlier: false, desc: 'Tree fruit' },
                { id: 'banana', label: 'Banana', icon: '🍌', isOutlier: false, desc: 'Herb fruit' },
                { id: 'mango', label: 'Mango', icon: '🥭', isOutlier: false, desc: 'Stone fruit' },
                { id: 'carrot', label: 'Carrot', icon: '🥕', isOutlier: true, desc: 'Root vegetable' },
              ].map((item) => {
                const isSelected = catSelected === item.id;
                let cardStyle = 'retro-card retro-card-interactive p-4 text-center';
                if (catSelected) {
                  if (item.isOutlier) {
                    cardStyle = 'retro-card p-4 text-center border-[2px] border-[#218653] bg-[#EAF7EE] shadow-[4px_4px_0px_#218653]';
                  } else if (isSelected && !item.isOutlier) {
                    cardStyle = 'retro-card p-4 text-center border-[2px] border-[#D94828] bg-[#FDEDE9] shadow-[4px_4px_0px_#D94828]';
                  }
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.isOutlier) sound.playCorrect();
                      else sound.playWrong();
                      setCatSelected(item.id);
                    }}
                    className={cardStyle}
                  >
                    <div className="text-3xl sm:text-4xl">{item.icon}</div>
                    <div className="serif font-bold text-base mt-2 text-[#242830]">{item.label}</div>
                    <div className="text-[11px] text-[#6B7280]">{item.desc}</div>
                  </button>
                );
              })}
            </div>

            {catSelected && (
              <div className={`p-4 rounded-[4px] border-[1.5px] border-[#30343B] text-xs sm:text-sm animate-in fade-in ${
                catSelected === 'carrot' ? 'bg-[#EAF7EE] text-[#218653]' : 'bg-[#FDEDE9] text-[#D94828]'
              }`}>
                {catSelected === 'carrot' ? (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <strong>Spot on!</strong> Carrot is a taproot vegetable grown underground, whereas Apple, Banana, and Mango are culinary and botanical fruits.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <strong>Not quite.</strong> That is a fruit! Look closely at the roots: 🥕 Carrot is an underground vegetable.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Practice Drill #2: Numerical */}
          <div className="retro-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] pb-3">
              <div>
                <span className="retro-label">Practice Drill #2</span>
                <h3 className="serif text-xl font-bold text-[#242830]">
                  Interactive Numerical Sequence
                </h3>
              </div>
              <span className="hand text-lg text-[#245D9C]">Find the sequence breaker!</span>
            </div>

            <p className="text-xs sm:text-sm text-[#6B7280]">
              Which number deviates wildly from the cluster pattern?
            </p>

            <div className="grid grid-cols-5 gap-2.5">
              {[8, 9, 10, 11, 75].map((val) => {
                const isOutlier = val === 75;
                const isSelected = numSelected === val;
                let btnStyle = 'retro-btn w-full !text-lg mono font-bold py-3';

                if (numSelected !== null) {
                  if (isOutlier) {
                    btnStyle += ' !bg-[#218653] !text-[#FFFCF4] !border-[#218653]';
                  } else if (isSelected && !isOutlier) {
                    btnStyle += ' !bg-[#D94828] !text-[#FFFCF4] !border-[#D94828]';
                  }
                }

                return (
                  <button
                    key={val}
                    onClick={() => {
                      if (isOutlier) sound.playCorrect();
                      else sound.playWrong();
                      setNumSelected(val);
                    }}
                    className={btnStyle}
                  >
                    {val}
                  </button>
                );
              })}
            </div>

            {numSelected !== null && (
              <div className={`p-4 rounded-[4px] border-[1.5px] border-[#30343B] text-xs sm:text-sm animate-in fade-in ${
                numSelected === 75 ? 'bg-[#EAF7EE] text-[#218653]' : 'bg-[#FDEDE9] text-[#D94828]'
              }`}>
                {numSelected === 75 ? (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <strong>Correct!</strong> 75 is an extreme numerical outlier. The first four values (8, 9, 10, 11) form a tight consecutive sequence spanning only 3 units, while 75 sits 64 units higher.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <strong>Keep looking:</strong> {numSelected} is part of the consecutive integer cluster [8, 9, 10, 11]. Look for the value sitting far down the number line.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: THE 4 GAME MODES */}
      {activeTab === 'modes' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Mode A */}
            <div className="retro-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] text-[#E85D16] shadow-[2px_2px_0px_#30343B]">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="serif text-lg font-bold text-[#242830]">Mode A: Quick Hunt</h3>
                    <p className="text-xs text-[#6B7280]">Rapid 5-Round Mixed Investigation</p>
                  </div>
                </div>
                <span className="retro-chip !text-[9px]">CASUAL SPRINT</span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Fast-paced rounds combining simple categorical oddities, quick integer jumps, and introductory server spikes. Perfect for a brisk 2-minute cognitive warmup.
              </p>
              <div className="p-2.5 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20 text-xs">
                <strong>Sample:</strong> Strawberry, Blueberry, Raspberry, Potato → Potato is a tuber.
              </div>
            </div>

            {/* Mode B */}
            <div className="retro-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] text-[#245D9C] shadow-[2px_2px_0px_#30343B]">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="serif text-lg font-bold text-[#242830]">Mode B: Category Clash</h3>
                    <p className="text-xs text-[#6B7280]">Qualitative Taxonomy Puzzles</p>
                  </div>
                </div>
                <span className="retro-chip !text-[9px]">CONCEPTUAL</span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Test your conceptual boundaries: fruits vs vegetables, sovereign nations vs fauna, aerial transport vs marine crafts, linear lists vs branching trees, and pure elements vs compounds.
              </p>
              <div className="p-2.5 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20 text-xs">
                <strong>Sample:</strong> India, Japan, France, Tiger → Tiger is an animal.
              </div>
            </div>

            {/* Mode C */}
            <div className="retro-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] text-[#218653] shadow-[2px_2px_0px_#30343B]">
                    <Hash className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="serif text-lg font-bold text-[#242830]">Mode C: Number Detective</h3>
                    <p className="text-xs text-[#6B7280]">Sequences & Distribution Leaps</p>
                  </div>
                </div>
                <span className="retro-chip !text-[9px]">NUMERICAL</span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Analyze discrete numbers, data entry errors (10× decimal shifts), negative domain breaches (-38 among positives), and numbers far past the cluster median.
              </p>
              <div className="p-2.5 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20 text-xs">
                <strong>Sample:</strong> 24, 26, 25, 27, 260 → 260 is an accidental 10× typing error.
              </div>
            </div>

            {/* Mode D */}
            <div className="retro-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] text-[#242830] shadow-[2px_2px_0px_#30343B]">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="serif text-lg font-bold text-[#242830]">Mode D: Data Scientist Challenge</h3>
                    <p className="text-xs text-[#6B7280]">Real Telemetry & Scientific Formulas</p>
                  </div>
                </div>
                <span className="retro-chip !text-[9px]">STATISTICAL LAB</span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Inspect authentic datasets (cloud API response latency, patient vitals, machine vibration, apartment rental rates) using interactive Fig. 1 charts, IQR fences, and Z-scores.
              </p>
              <div className="p-2.5 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20 text-xs">
                <strong>Features:</strong> Configurable raw dataset, detection rule switch, and shuffle button.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FORMULAS & MATHEMATICAL RULES */}
      {activeTab === 'formulas' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="retro-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] pb-3">
              <div>
                <span className="retro-label">Data Science Toolkit</span>
                <h3 className="serif text-2xl font-bold text-[#242830]">
                  Outlier Detection Rules & Formulas
                </h3>
              </div>
              <span className="retro-chip !bg-[#242830] !text-[#FFFCF4]">RIGOROUS MATH</span>
            </div>

            {/* Rule 1: IQR Fences */}
            <div className="p-4 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="serif text-lg font-bold text-[#E85D16]">
                  1. Tukey’s 1.5 × IQR Fence Rule (Interquartile Range)
                </h4>
                <span className="mono text-xs font-semibold text-[#6B7280]">Non-Parametric</span>
              </div>

              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Developed by the legendary statistician <strong>John Tukey</strong> in 1977. This method does not assume a bell curve and is impervious to extreme values because percentiles (Q1, Q3) remain stable even when extreme points exist.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 mono text-xs font-bold text-center">
                <div className="p-3 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20">
                  <div className="retro-label !text-[9px] mb-1">Spread (IQR)</div>
                  <div className="text-[#242830] text-sm">IQR = Q3 − Q1</div>
                </div>
                <div className="p-3 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20">
                  <div className="retro-label !text-[9px] mb-1">Lower Fence</div>
                  <div className="text-[#E85D16] text-sm">Q1 − 1.5 × IQR</div>
                </div>
                <div className="p-3 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20">
                  <div className="retro-label !text-[9px] mb-1">Upper Fence</div>
                  <div className="text-[#E85D16] text-sm">Q3 + 1.5 × IQR</div>
                </div>
              </div>

              <div className="text-xs text-[#242830] bg-[#FFF8EB] p-3 rounded-[3px] border border-[#E85D16]/30">
                <strong>Detection Criteria:</strong> Any observation x &lt; Lower Fence OR x &gt; Upper Fence is flagged as an outlier. Points inside the fences represent the <span className="italic hand text-base text-[#E85D16]">"normal zone"</span>.
              </div>
            </div>

            {/* Rule 2: Z-Score */}
            <div className="p-4 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#FFFCF4] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="serif text-lg font-bold text-[#245D9C]">
                  2. Standard Score (Z-Score & ±2σ Rule)
                </h4>
                <span className="mono text-xs font-semibold text-[#6B7280]">Parametric</span>
              </div>

              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Measures how many standard deviations (σ) a given observation (x) lies away from the dataset's arithmetic mean (μ).
              </p>

              <div className="flex items-center justify-center p-3 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20 mono text-sm font-bold text-[#245D9C]">
                Z = (x − μ) / σ
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20">
                  <strong>|Z| &gt; 2.0 (Standard Threshold):</strong> Observations more than 2 standard deviations away occur less than ~5% of the time in normally distributed data.
                </div>
                <div className="p-2.5 rounded-[3px] bg-[#F8F2E5] border border-[#30343B]/20">
                  <strong>|Z| &gt; 3.0 (Extreme Outlier):</strong> Observations more than 3 standard deviations away denote extreme tail anomalies (&lt; 0.3% probability).
                </div>
              </div>
            </div>

            {/* Why Mean vs Median matters */}
            <div className="p-4 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F4FBF6] space-y-2 text-xs sm:text-sm text-[#242830]">
              <div className="serif font-bold text-base text-[#218653]">
                💡 Why Median is Robust but Mean is Sensitive
              </div>
              <p className="leading-relaxed">
                Consider dataset [10, 11, 12, 13, 14]. Mean = 12, Median = 12.
                <br />
                Now inject an outlier: [10, 11, 12, 13, 100].
                <br />
                The <strong>Median remains 12</strong> (unshaken!), but the <strong>Mean jumps to 29.2</strong>. That is why median and IQR fences are preferred in real-world anomaly detection!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SCORING, COMBOS & HONORS */}
      {activeTab === 'scoring' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="retro-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b-[1.5px] border-[#30343B] pb-3">
              <div>
                <span className="retro-label">Evaluation Metric</span>
                <h3 className="serif text-2xl font-bold text-[#242830]">
                  Scoring Engine & Honors
                </h3>
              </div>
              <Award className="h-6 w-6 text-[#E85D16]" />
            </div>

            <div className="grid sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5]">
                <div className="retro-label !text-[10px]">Base Points</div>
                <div className="mono text-2xl font-bold text-[#242830] mt-1">+100</div>
                <div className="text-[10px] text-[#6B7280]">Per correct call</div>
              </div>

              <div className="p-3 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5]">
                <div className="retro-label !text-[10px]">Speed Bonus</div>
                <div className="mono text-2xl font-bold text-[#218653] mt-1">Up to +50</div>
                <div className="text-[10px] text-[#6B7280]">Proportional to timer</div>
              </div>

              <div className="p-3 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5]">
                <div className="retro-label !text-[10px]">Combo Streak</div>
                <div className="mono text-2xl font-bold text-[#E85D16] mt-1">+20 / round</div>
                <div className="text-[10px] text-[#6B7280]">Consecutive answers</div>
              </div>

              <div className="p-3 rounded-[4px] border-[1.5px] border-[#30343B] bg-[#F8F2E5]">
                <div className="retro-label !text-[10px]">Clue Penalty</div>
                <div className="mono text-2xl font-bold text-[#D94828] mt-1">-30</div>
                <div className="text-[10px] text-[#6B7280]">When hint is opened</div>
              </div>
            </div>

            {/* Difficulty Multipliers */}
            <div className="space-y-2">
              <span className="retro-label">Difficulty Point Multipliers</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-[4px] border border-[#30343B] bg-[#FFFCF4]">
                  <strong>Easy:</strong> <span className="mono text-[#242830]">1.0× points</span> (45s)
                </div>
                <div className="p-2.5 rounded-[4px] border border-[#30343B] bg-[#FFFCF4]">
                  <strong>Medium:</strong> <span className="mono text-[#E85D16]">1.25× points</span> (35s)
                </div>
                <div className="p-2.5 rounded-[4px] border border-[#30343B] bg-[#FFFCF4]">
                  <strong>Hard:</strong> <span className="mono text-[#245D9C]">1.5× points</span> (25s)
                </div>
                <div className="p-2.5 rounded-[4px] border border-[#30343B] bg-[#FFFCF4]">
                  <strong>Expert:</strong> <span className="mono text-[#218653]">2.0× points</span> (20s)
                </div>
              </div>
            </div>

            {/* Detective Honors */}
            <div className="space-y-2">
              <span className="retro-label">Performance Ranks & Honors</span>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B]/40 bg-[#FFFCF4]">
                  <span className="font-bold text-[#242830]">🎖️ Virtuoso Anomaly Master</span>
                  <span className="mono text-[#218653] font-bold">100% Accuracy</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B]/40 bg-[#FFFCF4]">
                  <span className="font-bold text-[#242830]">🔍 Senior Data Sleuth</span>
                  <span className="mono text-[#245D9C] font-bold">80% – 99% Accuracy</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B]/40 bg-[#FFFCF4]">
                  <span className="font-bold text-[#242830]">📊 Competent Statistical Analyst</span>
                  <span className="mono text-[#E85D16] font-bold">60% – 79% Accuracy</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[4px] border border-[#30343B]/40 bg-[#FFFCF4]">
                  <span className="font-bold text-[#242830]">🌱 Cadet Data Detective</span>
                  <span className="mono text-[#6B7280] font-bold">&lt; 60% Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Launch Banner */}
      <div className="retro-card p-5 bg-[#F8F2E5] flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="retro-label">Investigation Commences</span>
          <div className="serif text-xl font-bold text-[#242830] mt-0.5">
            Ready to test your pattern recognition?
          </div>
          <p className="text-xs text-[#6B7280]">
            "Trust your eyes. Check the math."
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isModal && onClose && (
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="retro-btn"
            >
              Close Manual
            </button>
          )}

          <button
            onClick={() => {
              sound.playPop();
              onStartPlaying();
            }}
            className="retro-btn retro-btn-primary !py-2.5 !px-8 !text-base"
          >
            GOT IT, LET'S PLAY! <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
