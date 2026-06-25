import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flag, ChevronLeft, ChevronRight, CheckCircle, HelpCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { questions } from '../constants/questions';
import { saveStudentProgress } from '../lib/firebaseStore';


export default function Quiz() {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = React.useState(0);
  
  // State to hold answers: { [questionId]: optionId ('A', 'B', 'C', 'D') }
  const [answers, setAnswers] = React.useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.userAnswers) return parsed.userAnswers;
    }
    return {};
  });

  // State to hold ragu-ragu: { [questionId]: boolean }
  const [ragu, setRagu] = React.useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.raguStatus) return parsed.raguStatus;
    }
    return {};
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Auto-save changes to localStorage so they persist if page refreshes
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      userData.userAnswers = answers;
      userData.raguStatus = ragu;
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [answers, ragu]);

  const activeQuestion = questions[currentIdx];
  const selectedOption = answers[activeQuestion.id] || null;
  const isQuestionRagu = !!ragu[activeQuestion.id];

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: optionId
    }));
  };

  const handleToggleRagu = () => {
    setRagu(prev => ({
      ...prev,
      [activeQuestion.id]: !prev[activeQuestion.id]
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    let confirmHtml = `<p class="text-on-surface-variant text-sm">Anda telah menjawab <b>${answeredCount}</b> dari <b>${questions.length}</b> soal.</p>`;
    if (unansweredCount > 0) {
      confirmHtml += `<p class="text-error text-sm mt-2 font-bold">Peringatan: Ada <b>${unansweredCount}</b> soal yang belum dijawab!</p>`;
    }

    const { isConfirmed } = await Swal.fire({
      title: 'Kumpulkan Kuis?',
      html: confirmHtml,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Selesai!',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#005e9f',
      cancelButtonColor: '#191c1e',
      background: '#ffffff',
      color: '#191c1e',
    });

    if (!isConfirmed) return;

    setIsSubmitting(true);
    // Simulate minor calculation/submission delay
    await new Promise(r => setTimeout(r, 1000));

    // Calculate real score
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);

    // Save Score & Info to Local Storage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      userData.score = calculatedScore;
      userData.correctCount = correctCount;
      userData.incorrectCount = questions.length - correctCount;
      userData.userAnswers = answers;
      // We also clean up temp state to avoid stale sessions next time
      delete userData.raguStatus;
      localStorage.setItem('user', JSON.stringify(userData));
      if (userData.class) {
        try {
          await saveStudentProgress(userData.class, userData);
        } catch (err) {
          console.error('Failed to sync quiz score to cloud:', err);
        }
      }
    }

    if (calculatedScore >= 80) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#005e9f', '#fcab28', '#ffffff']
      });
    }

    await Swal.fire({
      title: 'Kuis Selesai! 🎉',
      text: `Selamat, Anda berhasil mengumpulkan kuis dengan nilai ${calculatedScore}.`,
      icon: 'success',
      confirmButtonText: 'Lihat Hasil Belajar',
      confirmButtonColor: '#fcab28',
      background: '#ffffff',
      color: '#191c1e',
    });

    navigate('/result');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Quiz Section (Left) */}
        <main className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          {/* Progress Card */}
          <section className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h1 className="text-xl md:text-2xl text-on-surface mb-1 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Kuis Harian: Kelompok Sosial
                </h1>
                <p className="text-sm text-on-surface-variant font-medium">
                  Soal <span className="text-primary font-bold text-base">{currentIdx + 1}</span> dari <span className="font-bold">{questions.length}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-on-surface-variant block mb-1 font-bold uppercase tracking-wider">Hasil Terjawab</span>
                <span className="text-2xl font-black text-primary">{progressPercent}%</span>
              </div>
            </div>
            <div className="w-full bg-primary-fixed h-2.5 rounded-full overflow-hidden">
              <motion.div 
                initial={false}
                animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                className="bg-primary h-full rounded-full transition-all duration-300"
              />
            </div>
          </section>

          {/* Question Card */}
          <section className="bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-sm p-6 md:p-8 min-h-[400px] flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Sosiologi Kelas XI
                </span>
                {isQuestionRagu && (
                  <span className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    Ditandai Ragu-Ragu
                  </span>
                )}
              </div>
              
              <h2 className="text-lg md:text-xl text-on-surface mb-8 leading-relaxed font-display font-medium">
                {activeQuestion.q}
              </h2>

              <div className="flex flex-col gap-3.5">
                {activeQuestion.opts.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button 
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={cn(
                        "flex items-center p-4 rounded-xl border transition-all duration-200 text-left group active:scale-[0.99]",
                        isSelected 
                          ? "border-primary bg-primary-fixed/20 ring-2 ring-primary/10 shadow-sm" 
                          : "border-surface-variant bg-surface hover:border-primary/50 hover:bg-surface-container-low"
                      )}
                    >
                      <span className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 transition-colors shrink-0",
                        isSelected 
                          ? "bg-primary text-on-primary" 
                          : "bg-surface-container text-on-surface-variant group-hover:bg-primary-fixed group-hover:text-primary"
                      )}>
                        {opt.id}
                      </span>
                      <span className={cn(
                        "font-medium leading-relaxed text-sm md:text-base",
                        isSelected ? "text-primary font-bold" : "text-on-surface"
                      )}>
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-surface-variant">
              <button 
                onClick={prevQuestion}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline text-on-surface font-bold hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 text-sm"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Sebelumnya</span>
              </button>

              <button 
                onClick={handleToggleRagu}
                className={cn(
                  "hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-sm",
                  isQuestionRagu 
                    ? "bg-amber-100 text-amber-800 border border-amber-300 shadow-sm scale-105" 
                    : "text-on-surface-variant border border-outline hover:bg-surface-container"
                )}
              >
                <Flag className={cn("w-4 h-4", isQuestionRagu && "fill-current text-amber-600")} />
                <span>{isQuestionRagu ? 'Simpan Ragu' : 'Tandai Ragu'}</span>
              </button>

              {currentIdx === questions.length - 1 ? (
                <button 
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 text-sm"
                >
                  <span>Kumpulkan</span>
                  <CheckCircle className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={nextQuestion}
                  className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-primary-container transition-all active:scale-95 flex items-center gap-2 text-sm ml-auto"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Mobile Ragu layout */}
            <div className="flex justify-center sm:hidden mt-4">
              <button 
                onClick={handleToggleRagu}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 text-xs w-full justify-center",
                  isQuestionRagu 
                    ? "bg-amber-100 text-amber-800 border border-amber-300" 
                    : "text-on-surface-variant border border-outline hover:bg-surface-container"
                )}
              >
                <Flag className={cn("w-4 h-4", isQuestionRagu && "fill-current text-amber-600")} />
                <span>{isQuestionRagu ? 'Tercatat Ragu-Ragu' : 'Tandai Ragu-Ragu'}</span>
              </button>
            </div>
          </section>
        </main>

        {/* Navigation Sidebar (Right) */}
        <aside className="col-span-1 lg:col-span-4 sticky top-28 w-full">
          <section className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-1 font-display">Navigasi CBT</h3>
            <p className="text-xs text-on-surface-variant mb-6 font-medium">Klik nomor tombol untuk berpindah pertanyaan secara instan.</p>
            
            <div className="grid grid-cols-5 gap-3.5">
              {questions.map((q, idx) => {
                const isSelectedAndAnswered = answers[q.id] !== undefined;
                const isHighlightedRagu = !!ragu[q.id];
                const isActive = idx === currentIdx;

                return (
                  <button 
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={cn(
                      "aspect-square flex flex-col items-center justify-center rounded-xl font-black text-sm border-2 transition-all duration-200 outline-none active:scale-90 relative",
                      isActive 
                        ? "border-primary border-3 scale-110 shadow-md translate-y-[-2px] z-10" 
                        : isHighlightedRagu 
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : isSelectedAndAnswered 
                            ? "bg-green-100 text-green-800 border-green-300" 
                            : "bg-surface text-on-surface border-outline-variant hover:border-outline hover:bg-surface-container-low"
                    )}
                  >
                    <span>{q.id}</span>
                    {isHighlightedRagu && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend / Petunjuk */}
            <div className="mt-8 pt-6 border-t border-surface-variant space-y-3.5">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Keterangan Status</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-green-100 border border-green-300"></div>
                  <span className="font-semibold text-on-surface-variant">Terjawab</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-amber-100 border border-amber-300"></div>
                  <span className="font-semibold text-on-surface-variant">Ragu-Ragu</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md bg-surface border border-outline-variant"></div>
                  <span className="font-semibold text-on-surface-variant">Belum Diisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-md border-2 border-primary"></div>
                  <span className="font-semibold text-on-surface-variant">Aktif</span>
                </div>
              </div>
            </div>

            {/* Quick Submit Info */}
            <div className="mt-8 bg-surface-container-low border border-outline-variant rounded-xl p-4 text-center">
              <p className="text-xs text-on-surface-variant font-medium mb-3 leading-relaxed">
                Sudah selesai menjawab dan ingin mengirim semua hasil belajar?
              </p>
              <button
                onClick={handleSubmitQuiz}
                className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold text-sm hover:bg-primary-container transition-colors shadow-sm cursor-pointer active:scale-95"
              >
                Kumpulkan Sekarang
              </button>
            </div>

          </section>
        </aside>

      </div>
    </div>
  );
}

