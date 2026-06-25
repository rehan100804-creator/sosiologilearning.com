import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ALLOWED_STUDENTS, Student } from '../constants/students';
import { getAllStudentProgress, saveStudentProgress } from '../lib/firebaseStore';
import { googleSignIn, getAccessToken } from '../lib/auth';
import { findOrCreateSpreadsheet, syncAllStudentsData } from '../lib/workspace';
import { 
  Users, Award, PlayCircle, BookOpen, ExternalLink, 
  RefreshCw, Search, Check, AlertCircle, FileSpreadsheet, Lock, Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';

export default function Dosen() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [dbProgress, setDbProgress] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'quiz_done' | 'quiz_pending' | 'active'>('all');
  
  // Google Auth & Sync States
  const [googleUser, setGoogleUser] = React.useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);

  // Authenticate Admin Access on Mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    const parsed = JSON.parse(savedUser);
    if (!parsed.isDosen) {
      Swal.fire({
        title: 'Akses Ditolak',
        text: 'Halaman ini hanya dapat diakses oleh Dosen / Guru Sosiologi.',
        icon: 'error',
        confirmButtonText: 'Kembali ke Dashboard',
        confirmButtonColor: '#0077c8'
      });
      navigate('/dashboard');
      return;
    }
    setCurrentUser(parsed);
    fetchProgressData();
  }, [navigate]);

  const fetchProgressData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    
    try {
      const records = await getAllStudentProgress();
      setDbProgress(records || []);
    } catch (err) {
      console.error('Failed to pull Firestore data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleConnectGoogle = async () => {
    setIsAuthLoading(true);
    try {
      const authResult = await googleSignIn();
      if (authResult) {
        setGoogleUser(authResult.user);
        Swal.fire({
          title: 'Google Terhubung',
          text: `Berhasil login dengan akun ${authResult.user.email}`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error('Google link failed:', err);
      Swal.fire({
        title: 'Koneksi Gagal',
        text: 'Gagal menghubungkan akun Google. Pastikan izin akses sheets disetujui.',
        icon: 'error',
        confirmButtonText: 'Mengerti'
      });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSyncToSheets = async () => {
    let token = await getAccessToken();
    if (!token) {
      setIsAuthLoading(true);
      try {
        const authResult = await googleSignIn();
        if (authResult) {
          setGoogleUser(authResult.user);
          token = authResult.accessToken;
        } else {
          setIsAuthLoading(false);
          return;
        }
      } catch (err) {
        console.error('OAuth flow interrupted:', err);
        setIsAuthLoading(false);
        Swal.fire({
          title: 'Gagal Otorisasi',
          text: 'Harap login dengan Google terlebih dahulu.',
          icon: 'error',
          confirmButtonText: 'Coba Lagi'
        });
        return;
      } finally {
        setIsAuthLoading(false);
      }
    }

    setIsSyncing(true);
    try {
      Swal.fire({
        title: 'Sedang Sinkronisasi...',
        text: 'Mencari atau membuat file lembar nilai di folder Google Drive Dosen...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // 1. Find or create Spreadsheet
      const spreadsheetId = await findOrCreateSpreadsheet(token);

      // 2. Map all 31 pre-enrolled students (including blanks) to Rows
      const studentRows = ALLOWED_STUDENTS.map((student, idx) => {
        // Exclude the teacher herself if she's on the allowed list to keep student grades clean
        if (student.isDosen) return null;

        const p = dbProgress.find(item => item.nim === student.nim);

        return [
          idx + 1,
          student.nim,
          student.name,
          p && p.score !== null ? `${p.score}` : '0',
          p && p.watchedVideo ? 'Sudah' : 'Belum',
          p && p.readModule ? 'Sudah' : 'Belum',
          p && p.viewedSources ? 'Sudah' : 'Belum',
          p && p.updatedAt ? new Date(p.updatedAt).toLocaleString('id-ID') : 'Belum Masuk'
        ];
      }).filter(row => row !== null);

      // 3. Sync
      await syncAllStudentsData(token, spreadsheetId, studentRows);

      Swal.fire({
        title: 'Sinkronisasi Berhasil! 🎉',
        html: `
          <p class="text-sm mb-4 text-on-surface-variant">Semua data presensi & hasil kuis 31 siswa telah disinkronkan ke file lembar nilai di Google Drive Anda.</p>
          <div class="p-3 bg-green-50 border border-green-200 rounded-xl mb-3 text-xs text-green-700 font-bold">
            Data Hasil Belajar Siswa - Sosiologi
          </div>
          <p class="text-xs text-outline font-semibold">Tautan spreadsheet telah tersimpan dalam folder sosiologi Anda.</p>
        `,
        icon: 'success',
        confirmButtonText: 'Buka Google Sheet',
        confirmButtonColor: '#fcab28',
        showCancelButton: true,
        cancelButtonText: 'Tutup',
        cancelButtonColor: '#191c1e'
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(`https://docs.google.com/spreadsheets/d/${spreadsheetId}`, '_blank');
        }
      });

    } catch (err) {
      console.error('Sync failed:', err);
      Swal.fire({
        title: 'Sinkronisasi Gagal',
        text: 'Terjadi kegagalan saat menulis data ke Google API. Silakan coba kembali.',
        icon: 'error',
        confirmButtonText: 'Tutup'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter students (only those listed as student, i.e., !isDosen)
  const studentsListOnly = ALLOWED_STUDENTS.filter(s => !s.isDosen);

  const studentsWithProgress = studentsListOnly.map(student => {
    const progress = dbProgress.find(p => p.nim === student.nim);
    return {
      student,
      progress,
    };
  });

  const filteredStudents = studentsWithProgress.filter(({ student, progress }) => {
    const nameMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.nim.includes(searchQuery);
    
    if (!nameMatch) return false;

    if (statusFilter === 'quiz_done') {
      return progress && progress.score !== null;
    }
    if (statusFilter === 'quiz_pending') {
      return !progress || progress.score === null;
    }
    if (statusFilter === 'active') {
      return progress !== undefined;
    }

    return true;
  });

  // Calculate stats
  const activeCount = dbProgress.filter(p => !ALLOWED_STUDENTS.find(s => s.nim === p.nim)?.isDosen).length;
  const submissions = dbProgress.filter(p => p.score !== null && !ALLOWED_STUDENTS.find(s => s.nim === p.nim)?.isDosen);
  const quizAvg = submissions.length > 0 
    ? Math.round(submissions.reduce((acc, curr) => acc + (curr.score || 0), 0) / submissions.length) 
    : 0;
  
  const videoWatchedCount = dbProgress.filter(p => p.watchedVideo && !ALLOWED_STUDENTS.find(s => s.nim === p.nim)?.isDosen).length;
  const moduleReadCount = dbProgress.filter(p => p.readModule && !ALLOWED_STUDENTS.find(s => s.nim === p.nim)?.isDosen).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
      
      {/* Header Banner */}
      <header className="mb-10 bg-primary-fixed text-on-primary-fixed-variant p-6 md:p-8 rounded-3xl shadow-sm border border-primary/10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-48 h-48 text-primary" />
        </div>
        <div className="z-10">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
            <Lock className="w-4 h-4" /> PANEL ADMINISTRATOR DOSEN
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-display leading-tight">{currentUser?.name || 'Rani Kartika, M.Pd.'}</h1>
          <p className="text-sm font-medium mt-1 text-on-primary-fixed-variant/80">Pantau progres kuis, presensi belajar, dan ekspor lembar nilai kelas Sosiologi XI.</p>
        </div>
        
        {/* Sync Controls */}
        <div className="flex flex-wrap gap-3 z-10">
          <button 
            onClick={fetchProgressData}
            disabled={isRefreshing}
            className="flex items-center justify-center p-3 rounded-xl border border-outline bg-surface hover:bg-surface-container transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            title="Muat Ulang Data"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-primary' : 'text-on-surface-variant'}`} />
          </button>

          {!googleUser && (
            <button
              onClick={handleConnectGoogle}
              disabled={isAuthLoading || isSyncing}
              className="flex items-center gap-2 bg-surface text-on-surface border border-outline px-4 py-3 rounded-xl hover:bg-surface-container font-semibold transition-all active:scale-95 cursor-pointer text-sm"
            >
              <Users className="w-5 h-5 text-primary" />
              <span>{isAuthLoading ? 'Proses...' : 'Otorisasi Google'}</span>
            </button>
          )}

          <button
            onClick={handleSyncToSheets}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-primary text-on-primary font-black px-5 py-3 rounded-xl hover:bg-primary-container transition-all shadow-md active:scale-95 cursor-pointer text-sm"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Kirim Ke Google Sheet'}</span>
          </button>
        </div>
      </header>

      {/* Summary Scorecards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Total Mahasiswa</span>
            <span className="text-3xl font-black text-primary">{studentsListOnly.length} <span className="text-sm font-semibold text-outline">Siswa</span></span>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Aktif Belajar</span>
            <span className="text-3xl font-black text-secondary">{activeCount} / {studentsListOnly.length} <span className="text-sm font-semibold text-outline">Siswa</span></span>
          </div>
          <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
            <RefreshCw className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Rerata Kuis</span>
            <span className="text-3xl font-black text-amber-500">{quizAvg}% <span className="text-xs font-semibold text-outline">{submissions.length} Selesai</span></span>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">Partisipasi Video</span>
            <span className="text-3xl font-black text-red-500">{videoWatchedCount} <span className="text-sm font-semibold text-outline">Siswa</span></span>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
            <PlayCircle className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Main Table Segment */}
      <main className="bg-surface-container-lowest border border-surface-variant rounded-2xl shadow-sm p-6 md:p-8">
        
        {/* Table Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-outline-variant pl-12 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 placeholder:text-outline"
              placeholder="Cari Nama Siswa atau NIM..."
              type="text"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center text-sm font-semibold">
            <span className="text-on-surface-variant mr-1">Filter:</span>
            {[
              { id: 'all', label: 'Semua Siswa' },
              { id: 'active', label: 'Sudah Login' },
              { id: 'quiz_done', label: 'Sudah Kuis' },
              { id: 'quiz_pending', label: 'Belum Kuis' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                  statusFilter === tab.id 
                    ? 'bg-primary text-on-primary font-bold' 
                    : 'bg-surface hover:bg-surface-container border border-outline-variant text-on-surface-variant'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table UI */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full" />
            <p className="text-sm font-medium text-on-surface-variant">Sedang memuat data prestasi siswa...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <AlertCircle className="w-12 h-12 text-outline" />
            <p className="font-bold text-on-surface">Data Siswa Tidak Ditemukan</p>
            <p className="text-xs text-on-surface-variant">Cobalah mengubah filter status atau menghapus kata pencarian Anda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-outline-variant">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-on-surface-variant uppercase text-[10px] font-black tracking-widest border-b border-outline-variant">
                  <th className="py-4 px-5 w-12 text-center">No</th>
                  <th className="py-4 px-5">Mahasiswa</th>
                  <th className="py-4 px-5 text-center">Nilai Quiz</th>
                  <th className="py-4 px-5 text-center">Video Sosiologi</th>
                  <th className="py-4 px-5 text-center">Membaca Modul</th>
                  <th className="py-4 px-5 text-center">Sumber Belajar</th>
                  <th className="py-4 px-5 text-right">Pembaruan Cloud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-sm">
                {filteredStudents.map(({ student, progress }, index) => {
                  const hasSubmissions = progress && progress.score !== null;
                  
                  return (
                    <tr key={student.nim} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 px-5 text-center font-bold text-outline-variant">{studentsListOnly.findIndex(s => s.nim === student.nim) + 1}</td>
                      <td className="py-4 px-5">
                        <div className="font-bold text-on-surface leading-tight">{student.name}</div>
                        <div className="text-xs font-mono text-outline mt-0.5">NIM: {student.nim}</div>
                      </td>
                      <td className="py-4 px-5 text-center">
                        {hasSubmissions ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="text-sm font-extrabold text-primary">{progress.score}%</span>
                            <span className="text-[10px] text-outline font-semibold">({progress.correctCount}/{progress.correctCount + progress.incorrectCount} Benar)</span>
                          </div>
                        ) : (
                          <span className="inline-block bg-yellow-50 text-yellow-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-yellow-200">BELUM KUIS</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-center">
                        {progress?.watchedVideo ? (
                          <span className="inline-flex items-center gap-1 bg-green-50 text-green-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-green-200">
                            <Check className="w-3 h-3" /> SUDAH
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-outline-variant">-</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-center">
                        {progress?.readModule ? (
                          <span className="inline-flex items-center gap-1 bg-green-50 text-green-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-green-200">
                            <Check className="w-3 h-3" /> SUDAH
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-outline-variant">-</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-center">
                        {progress?.viewedSources ? (
                          <span className="inline-flex items-center gap-1 bg-green-50 text-green-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-green-200">
                            <Check className="w-3 h-3" /> SUDAH
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-outline-variant">-</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-right font-mono text-[11px] text-on-surface-variant font-medium">
                        {progress?.updatedAt ? (
                          <span>{new Date(progress.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}, {new Date(progress.updatedAt).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                        ) : (
                          <span className="italic text-outline-variant text-[10px]">Belum login</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

    </div>
  );
}
