import React from 'react';
import { Trophy, CheckCircle, XCircle, ArrowLeft, Printer, FileDown, RotateCcw, Home, LogOut, CloudUpload, CloudCheck } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { getAccessToken } from '../lib/auth';
import { findOrCreateSpreadsheet, appendStudentData } from '../lib/workspace';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { questions } from '../constants/questions';

export default function Result() {
  const [user, setUser] = React.useState<any>({ name: 'Pelajar', class: '-' });
  const navigate = useNavigate();

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
  }, []);

  const exportToExcel = () => {
    const overviewData = [
      { Kategori: "Nama Siswa", Nilai: user.name || 'Pelajar' },
      { Kategori: "Kelas", Nilai: user.class || '-' },
      { Kategori: "Skor Akhir", Nilai: user.score || 0 },
      { Kategori: "Jawaban Benar", Nilai: user.correctCount !== undefined ? user.correctCount : 0 },
      { Kategori: "Jawaban Salah", Nilai: user.incorrectCount !== undefined ? user.incorrectCount : 0 },
      { Kategori: "Waktu Pengunduhan", Nilai: new Date().toLocaleString('id-ID') },
    ];

    const detailData = questions.map((q) => {
      const selectedOpt = (user.userAnswers || {})[q.id];
      let selectedText = "Tidak Dijawab";
      if (selectedOpt) {
        const optMatch = q.opts.find(o => o.id === selectedOpt);
        selectedText = optMatch ? `(${selectedOpt}) ${optMatch.text}` : selectedOpt;
      }
      const correctOpt = q.correct;
      const correctMatch = q.opts.find(o => o.id === correctOpt);
      const correctText = correctMatch ? `(${correctOpt}) ${correctMatch.text}` : correctOpt;

      const isCorrect = selectedOpt === correctOpt;

      return {
        "No Soal": q.id,
        "Pertanyaan": q.q,
        "Jawaban Siswa": selectedText,
        "Kunci Jawaban": correctText,
        "Status": isCorrect ? "BENAR" : "SALAH"
      };
    });

    const wb = XLSX.utils.book_new();

    const wsOverview = XLSX.utils.json_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(wb, wsOverview, "Ringkasan Hasil");

    const wsDetail = XLSX.utils.json_to_sheet(detailData);
    XLSX.utils.book_append_sheet(wb, wsDetail, "Rincian Jawaban");

    const fileName = `Hasil_CBT_${(user.name || 'Siswa').replace(/\s+/g, '_')}_Kelas_${(user.class || 'Kelas').replace(/\s+/g, '_')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const handleLihatHasil = (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      exportToExcel();
    } catch (err) {
      console.error("Gagal ekspor ke Excel:", err);
    }

    Swal.fire({
      title: 'Excel Hasil Quiz Diunduh!',
      html: `
        <div style="text-align: left; line-height: 1.6; font-size: 14px; color: #374151;">
          <p>Halo <strong>${user.name || 'Pelajar'}</strong>,</p>
          <p>Hasil quiz Anda telah berhasil dikonversikan ke file Excel (yang memuat rincian jawaban <strong>Benar (${user.correctCount || 0})</strong>, <strong>Salah (${user.incorrectCount || 0})</strong>, dan total <strong>Skor: ${user.score || 0}</strong>) serta diunduh secara otomatis.</p>
          <div style="padding: 12px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; color: #166534; font-size: 12px; margin-top: 10px; font-weight: 500;">
            Silakan simpan file Excel tersebut dan unggah/kumpulkan ke folder Google Drive pengumpulan tugas dengan menklik tombol hijau di bawah ini.
          </div>
        </div>
      `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Buka Google Drive',
      cancelButtonText: 'Evaluasi Soal',
      confirmButtonColor: '#25D366',
      cancelButtonColor: '#0284c7',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        window.open('https://drive.google.com/drive/folders/12KCzHXiMBwb-IrwqxnlCO-OucO4zcuD8?usp=sharing', '_blank');
        navigate('/review');
      } else {
        navigate('/review');
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface rounded-3xl border border-surface-variant shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-8 md:p-12 w-full max-w-[640px] text-center relative overflow-hidden"
      >
        <div className="absolute top-6 right-6">
          <div className="flex items-center gap-1.5 text-green-600 text-[10px] font-bold uppercase bg-green-50 border border-green-200 px-3 py-1 rounded-full">
            <CloudCheck className="w-3.5 h-3.5" /> Sinkronisasi cloud aktif
          </div>
        </div>

        <div className="mb-8 flex justify-center">
...
          <div className="w-20 h-20 bg-secondary-container/20 rounded-full flex items-center justify-center animate-bounce">
            <Trophy className="w-12 h-12 text-secondary-container fill-current" />
          </div>
        </div>

        <h1 className="text-4xl text-primary mb-2 font-display">Quiz Selesai!</h1>
        <p className="text-on-surface-variant mb-10">Kerja bagus, {user.name} (Kelas {user.class})</p>

        <div className="bg-surface-container-low rounded-2xl p-8 mb-10 border border-outline-variant">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Nilai Akhir</span>
            <span className="block text-7xl font-display text-primary my-2">{user.score || 0}</span>
            <span className="inline-block bg-primary-fixed text-primary font-bold px-6 py-1 rounded-full text-sm">
              {(user.score || 0) >= 75 ? 'Baik' : 'Perlu Belajar Lagi'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-8 border-t border-outline-variant pt-8">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-on-surface-variant uppercase mb-2">Benar</span>
              <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                <CheckCircle className="w-6 h-6 fill-current" /> {user.correctCount !== undefined ? user.correctCount : 0}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-on-surface-variant uppercase mb-2">Salah</span>
              <div className="flex items-center gap-2 text-2xl font-bold text-error">
                <XCircle className="w-6 h-6 fill-current" /> {user.incorrectCount !== undefined ? user.incorrectCount : 0}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={handleLihatHasil} 
            className="bg-secondary-container text-on-secondary-container font-bold py-3 px-8 rounded-xl shadow-sm hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer active:scale-95"
          >
            <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /> Lihat Hasil
          </button>
          <NavLink to="/quiz" className="bg-surface hover:bg-surface-container-low border border-outline text-primary font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2 group">
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> Ulangi Quiz
          </NavLink>
        </div>
        
        <div className="mt-8 pt-8 border-t border-surface-variant flex gap-6 justify-center">
          <NavLink to="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-sm font-bold">
            <Home className="w-4 h-4" /> Dashboard
          </NavLink>
          <NavLink to="/login" className="text-on-surface-variant hover:text-error transition-colors flex items-center gap-1.5 text-sm font-bold">
            <LogOut className="w-4 h-4" /> Keluar
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
}
