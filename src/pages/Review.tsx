import React from 'react';
import { ChevronLeft, Printer, CheckCircle, XCircle, Lightbulb, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { questions } from '../constants/questions';

export default function Review() {
  const [user, setUser] = React.useState<any>(null);
  const [highlightedId, setHighlightedId] = React.useState<number | null>(null);
  
  // Refs to allow smooth scrolling to any of the 20 questions
  const questionRefs = React.useRef<Record<number, HTMLDivElement | null>>({});

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const userAnswers = user?.userAnswers || {};
  const score = user?.score !== undefined ? user.score : 0;
  const correctCount = user?.correctCount !== undefined ? user.correctCount : 0;
  const incorrectCount = user?.incorrectCount !== undefined ? user.incorrectCount : 0;

  const handleScrollToQuestion = (id: number) => {
    const target = questionRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedId(id);
      setTimeout(() => {
        setHighlightedId(null);
      }, 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full px-4 md:px-8 max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Minimap */}
      <aside className="hidden lg:block lg:col-span-3 sticky top-28">
        <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-1 font-display">Navigasi CBT</h3>
          <p className="text-xs text-on-surface-variant mb-6 font-medium">Klik nomor untuk langsung melompat ke soal bersangkutan.</p>
          
          <div className="grid grid-cols-4 gap-3">
            {questions.map((q) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correct;
              const hasAnswered = selectedOpt !== undefined;

              return (
                <button 
                  key={q.id} 
                  onClick={() => handleScrollToQuestion(q.id)}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-xl font-bold text-sm border-2 transition-all hover:scale-105 active:scale-95 outline-none",
                    !hasAnswered
                      ? "bg-slate-50 text-slate-500 border-slate-200"
                      : isCorrect 
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                  )}
                >
                  {q.id}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-surface-variant space-y-2.5 text-xs text-on-surface-variant font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-green-50 border border-green-200"></div>
              <span>Jawaban Benar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-red-50 border border-red-200"></div>
              <span>Jawaban Salah / Kosong</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <section className="col-span-1 lg:col-span-9 space-y-8 w-full max-w-[800px]">
        {/* Header Summary */}
        <div className="bg-surface border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl text-primary mb-1.5 font-display font-medium">Evaluasi Pemahaman</h1>
            <p className="text-on-surface-variant text-sm font-medium">Siswa: <span className="text-on-surface font-bold">{user?.name || 'Pelajar'}</span> • Kelas <span className="text-on-surface font-bold">{user?.class || '-'}</span></p>
          </div>
          
          <div className="flex gap-5 items-center bg-surface-container-low p-4 rounded-2xl border border-surface-variant shrink-0">
            <div className="text-center px-2">
              <span className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Skor</span>
              <span className="text-2xl font-black text-primary font-display">{score}/100</span>
            </div>
            <div className="h-10 w-px bg-outline-variant"></div>
            <div className="text-center px-1">
              <span className="block text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Benar</span>
              <span className="text-2xl font-black text-green-600 font-display">{correctCount}</span>
            </div>
            <div className="h-10 w-px bg-outline-variant"></div>
            <div className="text-center px-1">
              <span className="block text-[10px] font-black text-error uppercase tracking-widest mb-1">Salah</span>
              <span className="text-2xl font-black text-error font-display">{incorrectCount}</span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((rev) => {
            const selectedOpt = userAnswers[rev.id];
            const isCorrect = selectedOpt === rev.correct;
            const isHighlighted = highlightedId === rev.id;

            return (
              <div 
                key={rev.id} 
                ref={el => { questionRefs.current[rev.id] = el; }}
                className={cn(
                  "bg-surface border rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-500 group relative",
                  isHighlighted 
                    ? "border-primary ring-4 ring-primary/10 scale-[1.01] shadow-md bg-primary-fixed/5" 
                    : isCorrect 
                      ? "border-green-200 hover:border-green-400" 
                      : selectedOpt !== undefined 
                        ? "border-red-200 hover:border-red-300"
                        : "border-outline-variant hover:border-slate-300"
                )}
              >
                {/* Visual Accent Badge For Highlight */}
                {isHighlighted && (
                  <span className="absolute -top-3 left-6 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce">
                    Fokus Soal {rev.id}
                  </span>
                )}

                <div className="flex gap-4 md:gap-6 mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-display font-bold shrink-0 shadow-inner",
                    selectedOpt === undefined
                      ? "bg-slate-100 text-slate-500"
                      : isCorrect 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-error"
                  )}>
                    {rev.id}
                  </div>
                  <div className="w-full">
                    <p className="text-base md:text-lg text-on-surface mb-6 font-medium leading-relaxed">
                      {rev.q}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {rev.opts.map((opt) => {
                        const isThisOptSelected = selectedOpt === opt.id;
                        const isThisOptCorrect = rev.correct === opt.id;

                        return (
                          <div 
                            key={opt.id} 
                            className={cn(
                              "flex items-center gap-3.5 p-4 rounded-xl border transition-all text-sm",
                              isThisOptCorrect 
                                ? "border-green-300 bg-green-50/75 text-green-900 font-bold" 
                                : isThisOptSelected 
                                  ? "border-red-300 bg-red-50/75 text-error font-semibold" 
                                  : "border-outline-variant bg-surface opacity-75"
                            )}
                          >
                            {isThisOptCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 fill-current" />
                            ) : isThisOptSelected ? (
                              <XCircle className="w-5 h-5 text-error shrink-0 fill-current" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-outline-variant flex items-center justify-center shrink-0 font-bold text-[10px] text-slate-400 bg-slate-50">
                                {opt.id}
                              </div>
                            )}
                            <span className="leading-relaxed">{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-5 bg-primary-fixed/5 border-l-4 border-primary rounded-r-xl">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 fill-current text-primary" /> Penjelasan Jawaban
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-medium">
                    {rev.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap justify-center gap-4 py-8 border-t border-surface-variant">
          <NavLink 
            to="/result" 
            className="bg-surface text-primary border border-primary font-bold px-8 py-3.5 rounded-xl hover:bg-primary-fixed transition-all flex items-center gap-2 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 mt-0.5" /> Kembali ke Hasil
          </NavLink>
          
          <button 
            onClick={handlePrint}
            className="bg-primary text-on-primary font-bold px-8 py-3.5 rounded-xl hover:bg-primary-container transition-all flex items-center gap-2 active:scale-95 shadow-md"
          >
            <Printer className="w-4.5 h-4.5" /> Cetak Lembar Evaluasi
          </button>
          
          <NavLink 
            to="/dashboard" 
            className="bg-surface-container-high text-on-surface font-bold px-8 py-3.5 rounded-xl hover:bg-surface-container transition-all flex items-center gap-2 active:scale-95"
          >
            <Home className="w-4.5 h-4.5" /> Dashboard Utama
          </NavLink>
        </div>
      </section>
    </div>
  );
}

