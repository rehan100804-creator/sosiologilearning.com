import React from 'react';
import { Book, PlayCircle, ClipboardList, TrendingUp, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { getStudentProgress } from '../lib/firebaseStore';
import { RumahGadangIllustration, PremiumPatternOverlay } from '../components/HeritageDecorations';

export default function Dashboard() {
  const [user, setUser] = React.useState<any>({ name: 'Pelajar', class: '-', score: 0 });

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // Pull fresh data from cloud if available to keep in sync
      if (parsedUser.class && parsedUser.loginMethod === 'manual') {
        getStudentProgress(parsedUser.class).then((freshData) => {
          if (freshData) {
            const merged = { ...parsedUser, ...freshData };
            localStorage.setItem('user', JSON.stringify(merged));
            setUser(merged);
          }
        }).catch((err) => console.error('Silent progress load failed:', err));
      }
    }
  }, []);

  // Calculate actual progress based on completed items (25% each)
  let actualProgress = 0;
  if (user.readModule) actualProgress += 25;
  if (user.watchedVideo) actualProgress += 25;
  if (user.score !== undefined && user.score > 0) actualProgress += 25;
  if (user.viewedSources) actualProgress += 25;

  const actions = [
    { title: 'Materi', sub: 'Modul Pembelajaran', icon: Book, color: 'text-primary', bg: 'bg-primary/10', path: '/materi', completed: !!user.readModule },
    { title: 'Video', sub: 'Pembelajaran', icon: PlayCircle, color: 'text-secondary', bg: 'bg-secondary/10', path: '/video', completed: !!user.watchedVideo },
    { title: 'Quiz', sub: 'Latihan Soal', icon: ClipboardList, color: 'text-primary', bg: 'bg-primary/10', path: '/quiz', completed: user.score !== undefined && user.score > 0 },
    { title: 'Hasil', sub: 'Evaluasi', icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10', path: '/result', completed: user.score !== undefined && user.score > 0 },
  ];

  return (
    <div className="w-full px-4 md:px-8 max-w-7xl mx-auto py-10 flex flex-col gap-10">
      {/* Welcome Banner */}
      <section className="bg-surface-container-lowest rounded-3xl border border-secondary/15 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Repeating gorgeous traditional gold-maroon base pattern, low opacity */}
        <PremiumPatternOverlay />
        
        {/* Subtle radial light glow in background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent pointer-events-none" />

        <div className="flex flex-col gap-4 relative z-10 w-full md:w-1/2">
          {user.isDosen ? (
            <>
              <div className="bg-primary/10 text-primary text-[10px] font-bold tracking-wider px-3 py-1 rounded-full self-start border border-primary/20">DOSEN AKTIF</div>
              <h1 className="text-3xl md:text-5xl text-on-surface font-extrabold font-display leading-tight">Halo, Ibu {user.name}!</h1>
              <p className="text-sm md:text-base text-on-surface-variant font-medium">Masuk menggunakan Akun Guru Sosiologi. Silakan klik menu "Panel Dosen" di navigasi atas untuk melihat hasil kelas siswa lengkap.</p>
            </>
          ) : (
            <>
              <div className="bg-secondary/10 text-secondary text-[10px] font-bold tracking-wider px-3 py-1 rounded-full self-start border border-secondary/20 uppercase">Ruang Belajar Siswa</div>
              <h1 className="text-3xl md:text-5xl text-on-surface font-extrabold font-display leading-tight">Halo, {user.name}!</h1>
              <p className="text-sm md:text-base text-on-surface-variant font-medium">NIM Presensi: <span className="font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">{user.class}</span> • Pembelajaran Sosiologi Kelompok Sosial.</p>
            </>
          )}
          
          {!user.isDosen && (
            <div className="mt-4 flex items-center gap-4 bg-surface-container-low/90 p-4 rounded-2xl border border-outline-variant/60 w-full max-w-md">
              <div className="flex-grow">
                <div className="flex justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-on-surface-variant uppercase tracking-wider">Progress Belajar Anda</span>
                  <span className="text-primary font-black">{actualProgress}%</span>
                </div>
                <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${actualProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Custom drawn traditional Rumah Gadang illustration on the right of Welcome Banner */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-end relative z-10 max-h-56 pr-4">
          <div className="w-full max-w-[340px] drop-shadow-sm hover:scale-[1.03] transition-transform duration-300">
            <RumahGadangIllustration color="#8C0B0C" />
          </div>
        </div>
      </section>

      {/* Navigation Tools */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, idx) => (
          <NavLink 
            key={idx}
            to={action.path}
            className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-8 shadow-sm flex flex-col items-center justify-center gap-4 interactive-hover relative overflow-hidden h-48 border-b-[3px] hover:border-b-secondary"
          >
            {/* Subtle base pattern watermark inside each card, very light */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-300 bg-repeat bg-[size:40px_40px]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23C5A03E'%3E%3Ccircle cx='60' cy='60' r='12' fill='none' stroke='%23C5A03E' stroke-width='2' /%3E%3C/g%3E%3C/svg%3E")`
            }} />

            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300", action.bg)}>
              <action.icon className={cn("w-8 h-8", action.color)} />
            </div>
            <div className="text-center relative z-10">
              <h3 className="text-lg text-on-surface font-bold font-display">{action.title}</h3>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{action.sub}</p>
            </div>
            {/* Completion badge */}
            {!user.isDosen && action.completed && (
              <span className="absolute top-3 right-3 text-emerald-700 bg-emerald-50/90 border border-emerald-200 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <CheckCircle className="w-2.5 h-2.5" /> Selesai
              </span>
            )}
            <div className={cn("absolute bottom-0 left-0 w-full h-[3px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left", action.color.replace('text-', 'bg-'))}></div>
          </NavLink>
        ))}
      </section>

      {/* Recent Activity */}
      {!user.isDosen && (
        <section>
          <h2 className="text-2xl font-bold font-display text-on-surface mb-6">Penugasan & Aktivitas Sosiologi</h2>
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-4 shadow-sm">
            <div className="flex flex-col divide-y divide-outline-variant">
              
              {/* Task 1: Read Module */}
              <div className="flex items-center justify-between py-4 hover:bg-surface/50 rounded-xl px-2 transition-colors duration-200 group">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-fixed p-3 rounded-lg"><Book className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h4 className="font-bold text-on-surface">Membaca Modul: Kelompok Sosial</h4>
                    <p className="text-xs text-on-surface-variant">Mempelajari klasifikasi kelompok sosial (Primer & Sekunder)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {user.readModule ? (
                    <span className="text-green-600 bg-green-50 border border-green-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Sudah Selesai
                    </span>
                  ) : (
                    <NavLink to="/materi" className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-full hover:bg-primary-container transition-all flex items-center gap-1">
                      Pelajari <ChevronRight className="w-3.5 h-3.5" />
                    </NavLink>
                  )}
                </div>
              </div>

              {/* Task 2: Watch Video */}
              <div className="flex items-center justify-between py-4 hover:bg-surface/50 rounded-xl px-2 transition-colors duration-200 group">
                <div className="flex items-center gap-4">
                  <div className="bg-tertiary-fixed p-3 rounded-lg"><PlayCircle className="w-5 h-5 text-tertiary" /></div>
                  <div>
                    <h4 className="font-bold text-on-surface">Menonton Video Pembelajaran Kelompok Sosial</h4>
                    <p className="text-xs text-on-surface-variant">Memahami visualisasi dinamika kelompok secara nyata</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {user.watchedVideo ? (
                    <span className="text-green-600 bg-green-50 border border-green-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Sudah Selesai
                    </span>
                  ) : (
                    <NavLink to="/video" className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-full hover:bg-primary-container transition-all flex items-center gap-1">
                      Tonton Video <ChevronRight className="w-3.5 h-3.5" />
                    </NavLink>
                  )}
                </div>
              </div>

              {/* Task 3: Quiz */}
              <div className="flex items-center justify-between py-4 hover:bg-surface/50 rounded-xl px-2 transition-colors duration-200 group">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary-fixed p-3 rounded-lg"><ClipboardList className="w-5 h-5 text-secondary" /></div>
                  <div>
                    <h4 className="font-bold text-on-surface">Kuis Penilaian Harian: Kelompok Sosial</h4>
                    <p className="text-xs text-on-surface-variant">Uji pemahaman Anda dengan menyelesaikan 20 butir soal sosiologi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {user.score !== undefined && user.score > 0 ? (
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-black text-sm bg-primary-fixed/30 px-3 py-1 rounded-lg">Skor: {user.score}%</span>
                      <NavLink to="/result" className="border border-outline text-on-surface-variant text-xs font-bold px-4 py-2 rounded-full hover:bg-surface-variant transition-colors">
                        Review Hasil
                      </NavLink>
                    </div>
                  ) : (
                    <NavLink to="/quiz" className="bg-secondary text-on-secondary text-xs font-bold px-4 py-2 rounded-full hover:bg-secondary-container transition-all flex items-center gap-1">
                      Mulai Kuis <ChevronRight className="w-3.5 h-3.5" />
                    </NavLink>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

    </div>
  );
}
