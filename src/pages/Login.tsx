import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, School, ArrowRight, AlertCircle, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { validateStudent } from '../constants/students';
import { getStudentProgress, saveStudentProgress } from '../lib/firebaseStore';
import Swal from 'sweetalert2';
import { LogoWithText } from '../components/Logo';
import { RumahGadangIllustration, GoldHeritageMedallion, GoldMaroonWallpaper } from '../components/HeritageDecorations';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ name: '', nim: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const matchedStudent = validateStudent(formData.name, formData.nim);

    if (!matchedStudent) {
      setErrorMsg('Nama Lengkap atau NIM tidak terdaftar. Silakan hubungi Guru Sosiologi.');
      setIsLoading(false);
      Swal.fire({
        title: 'Login Gagal',
        text: 'Nama Lengkap atau NIM yang Anda masukkan tidak sesuai dengan presensi kelas Sosiologi.',
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
        confirmButtonColor: 'var(--color-primary, #8C0B0C)'
      });
      return;
    }

    try {
      // 1. Fetch any existing progress from Firestore for this student
      const serverProgress: any = await getStudentProgress(matchedStudent.nim);
      
      const sessionUser = {
        name: matchedStudent.name,
        class: matchedStudent.nim, // We save the NIM in the 'class' field to match existing sheet headers and progress calculations
        isDosen: !!matchedStudent.isDosen,
        loginMethod: 'manual',
        score: serverProgress?.score !== undefined ? serverProgress.score : 0,
        correctCount: serverProgress?.correctCount || 0,
        incorrectCount: serverProgress?.incorrectCount || 0,
        watchedVideo: !!serverProgress?.watchedVideo,
        readModule: !!serverProgress?.readModule,
        viewedSources: !!serverProgress?.viewedSources,
        userAnswers: serverProgress?.userAnswers || {}
      };

      // 2. Save session locally
      localStorage.setItem('user', JSON.stringify(sessionUser));

      // 3. Save progress back once to register active timestamp
      await saveStudentProgress(matchedStudent.nim, sessionUser);

      Swal.fire({
        title: 'Berhasil Masuk!',
        text: `Selamat datang, ${matchedStudent.name}.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMsg('Terjadi kesalahan koneksi database. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoldMaroonWallpaper className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Sleek top/bottom subtle gradient shading for deep premium focus */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1E0103]/60 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1E0103]/60 to-transparent pointer-events-none z-0" />

      {/* Elegant Rumah Gadang sketch watermark in background, aligned beautifully */}
      <div className="hidden lg:block absolute -left-12 -bottom-16 w-[420px] opacity-20 hover:opacity-30 transition-opacity duration-500 z-0 pointer-events-none">
        <RumahGadangIllustration color="#E6C280" />
      </div>
      <div className="hidden lg:block absolute -right-12 -bottom-16 w-[420px] opacity-20 hover:opacity-30 transition-opacity duration-500 z-0 pointer-events-none transform -scale-x-100">
        <RumahGadangIllustration color="#E6C280" />
      </div>

      <motion.main 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
         className="w-full max-w-[480px] z-10"
      >
        <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col items-center border border-secondary/20 shadow-xl relative overflow-hidden">
          {/* Subtle gold medallion accent in card background */}
          <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
            <GoldHeritageMedallion className="w-24 h-24" />
          </div>

          {/* Sosiologi Learning Logo */}
          <div className="w-full max-w-[260px] mb-4 flex justify-center hover:scale-[1.03] transition-transform duration-300">
            <LogoWithText className="w-full h-auto" color="#8C0B0C" />
          </div>

          <div className="text-center mb-6 w-full flex flex-col items-center gap-1.5">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-secondary to-transparent mb-1" />
            <p className="text-on-surface-variant font-medium text-xs tracking-wide uppercase">Masuk Kelas Pembelajaran Online</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            {errorMsg && (
              <div className="flex gap-2.5 items-start p-4 bg-red-50/90 border border-red-200 rounded-xl text-xs text-error font-semibold">
                <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1" htmlFor="studentName">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4.5 h-4.5" />
                <input 
                  id="studentName"
                  className="w-full bg-surface/50 border border-outline-variant rounded-xl pl-11 pr-4 py-3 text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all outline-none text-sm placeholder:text-outline/70"
                  placeholder="Masukkan Nama Lengkap Anda"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  type="text"
                />
              </div>
              <p className="text-[10px] text-on-surface-variant/85 ml-1 font-medium">Contoh: Rayhan Adriansyah Permana</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider ml-1" htmlFor="studentNim">Nomor NIM / ID</label>
              <div className="relative">
                <School className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4.5 h-4.5" />
                <input 
                  id="studentNim"
                  className="w-full bg-surface/50 border border-outline-variant rounded-xl pl-11 pr-4 py-3 text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all outline-none text-sm placeholder:text-outline/70"
                  placeholder="Masukkan NIM Anda"
                  required
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                  type="text"
                />
              </div>
              <p className="text-[10px] text-on-surface-variant/85 ml-1 font-medium">Contoh NIM: 23058115</p>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/95 text-on-primary font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer text-sm border border-black/10"
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full"
                />
              ) : (
                <>
                  <span>Masuk Belajar</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </>
              )}
            </button>

            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/60 w-full">
              <span className="text-[9px] text-center font-bold text-on-surface-variant uppercase tracking-widest opacity-80">Mengalami Kendala Sistem?</span>
              <a 
                href="https://wa.link/52ueu2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer text-xs"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>Hubungi Developer</span>
              </a>
            </div>
          </form>
        </div>
      </motion.main>
    </GoldMaroonWallpaper>
  );
}
