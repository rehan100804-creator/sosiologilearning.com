import { BookOpen, CheckCircle, Fingerprint, Network as Hub, Home, Building2 as Apartment, Handshake, Users, Hash, Info, FileDown, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { saveStudentProgress } from '../lib/firebaseStore';

export default function Materi() {
  const factors = [
    { title: 'Darah (Keturunan)', desc: 'Kesamaan leluhur atau nenek moyang yang menciptakan ikatan kuat sejak lahir.' },
    { title: 'Geografis (Wilayah)', desc: 'Kedekatan tempat tinggal yang mendorong intensitas komunikasi dan interaksi.' },
    { title: 'Kepentingan (Asosiasi)', desc: 'Kesamaan visi, misi, atau hobi yang mengumpulkan individu dalam suatu wadah.' },
  ];

  const types = [
    { title: 'Paguyuban (Gemeinschaft)', icon: Home, color: 'text-secondary', desc: 'Kelompok sosial yang anggotanya memiliki ikatan batin yang murni, bersifat alamiah, dan kekal.', example: 'Keluarga besar, rukun tetangga di desa.' },
    { title: 'Patembayan (Gesellschaft)', icon: Apartment, color: 'text-tertiary', desc: 'Ikatan lahir yang bersifat pokok untuk jangka waktu yang pendek, bersifat imajiner and mekanis.', example: 'Ikatan pedagang, serikat pekerja.' },
    { title: 'Kelompok Primer', icon: Handshake, color: 'text-secondary', desc: 'Ditandai dengan pergaulan, kerja sama, dan tatap muka yang intim. Hubungan sangat personal.', example: 'Keluarga inti, sahabat karib.' },
    { title: 'Kelompok Sekunder', icon: Users, color: 'text-tertiary', desc: 'Terdiri dari banyak orang, hubungan tidak perlu saling mengenal pribadi, lebih formal dan utilitarian.', example: 'Koperasi, universitas.' },
  ];

  const handleTrack = async (type: string) => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      userData[type] = true;
      localStorage.setItem('user', JSON.stringify(userData));
      if (userData.class) {
        try {
          await saveStudentProgress(userData.class, userData);
        } catch (err) {
          console.error('Failed to sync module progress:', err);
        }
      }
    }
  };

  return (
    <div className="w-full px-4 md:px-8 max-w-7xl mx-auto py-12 flex flex-col gap-12">
      {/* Header Section */}
      <header className="max-w-[800px] mx-auto text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl text-on-surface mb-4 font-display">Kelompok Sosial</h1>
        <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">Mempelajari dinamika, struktur, dan peran individu dalam masyarakat untuk memahami bagaimana kita saling berinteraksi dan membentuk tatanan sosial yang lebih besar.</p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <span className="bg-primary-fixed text-on-primary-fixed-variant px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
            <Hash className="w-4 h-4" /> 15 Min Baca
          </span>
          <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
            <Info className="w-4 h-4" /> Bab 2
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a 
            href="https://repositori.kemendikdasmen.go.id/19480/1/Kelas%20XI_Sosiologi_KD%203.1%20%281%29.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => handleTrack('readModule')}
            className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl shadow-md hover:bg-primary-container transition-all flex items-center gap-2 active:scale-95"
          >
            <FileDown className="w-5 h-5" /> UNDUH MODUL PDF
          </a>
          <a 
            href="https://drive.google.com/drive/folders/1piNxr2UgeVZL80APe8LlJAhltsdp0XS1?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => handleTrack('viewedSources')}
            className="bg-surface-container-high text-primary border border-primary font-bold px-6 py-3 rounded-xl hover:bg-primary-fixed transition-all flex items-center gap-2 active:scale-95"
          >
            <ExternalLink className="w-5 h-5" /> SUMBER LAINNYA
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-[1000px] mx-auto">
        {/* Definition */}
        <section className="md:col-span-12 glass-card rounded-2xl p-8 interactive-hover bg-surface-container-lowest">
          <div className="flex items-center gap-3 mb-6 border-b border-surface-variant pb-4">
            <BookOpen className="text-primary w-7 h-7" />
            <h2 className="text-2xl text-on-surface">Pengertian</h2>
          </div>
          <div className="space-y-6">
            <p className="text-on-surface-variant leading-relaxed">Kelompok sosial adalah kumpulan individu yang saling berinteraksi secara teratur, memiliki kesadaran bersama akan keanggotaannya, dan saling bergantung satu sama lain untuk mencapai tujuan bersama. Berbeda dengan sekadar kerumunan sementara, kelompok sosial memiliki struktur dan norma yang mengatur anggotanya.</p>
            <div className="bg-surface-bright p-6 rounded-xl border-l-4 border-primary italic">
              "Kelompok sosial merupakan himpunan atau kesatuan-kesatuan manusia yang hidup bersama karena saling berhubungan di antara mereka secara timbal balik dan saling memengaruhi." - Soerjono Soekanto
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="md:col-span-6 glass-card rounded-2xl p-8 interactive-hover bg-surface-container-lowest">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-secondary w-7 h-7" />
            <h2 className="text-2xl text-on-surface">Syarat</h2>
          </div>
          <ul className="space-y-4">
            {['Kesadaran sebagai bagian dari kelompok', 'Hubungan timbal balik antar anggota', 'Faktor pemersatu (nasib/tujuan)', 'Struktur, kaidah, dan pola perilaku'].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-on-surface-variant">
                <div className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Characteristics */}
        <section className="md:col-span-6 glass-card rounded-2xl p-8 interactive-hover bg-surface-container-lowest">
          <div className="flex items-center gap-3 mb-6">
            <Fingerprint className="text-tertiary w-7 h-7" />
            <h2 className="text-2xl text-on-surface">Ciri-ciri</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-surface rounded-lg border border-surface-variant">
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-1">Kesatuan Nyata</h3>
              <p className="text-sm text-on-surface-variant">Dapat dikenali dan dipisahkan dari kelompok lain.</p>
            </div>
            <div className="p-3 bg-surface rounded-lg border border-surface-variant">
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-1">Interaksi Intensif</h3>
              <p className="text-sm text-on-surface-variant">Menghasilkan norma dan nilai bersama.</p>
            </div>
          </div>
        </section>

        {/* Factors */}
        <section className="md:col-span-12 relative rounded-2xl overflow-hidden interactive-hover">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container to-tertiary-container opacity-90 z-0"></div>
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMP-_XTdKZBCB8GzlbaXlNOCPVmcxt8_rTeNPNJL7QwErXdGlLN51MGzi4KC2lewb1jJaafuy_e6FvVLtF1019axtyEnRxK7u-mw-Kf9P9OrfDrhYZWFL_1dt3b9rsPV7wFMNSu2TE4dMtJHwFMrDiFBhPhSreVL_QAwdzaKYfDdieRNP54Mn-Ot91y0X2Pd9S39H72i3Cvy-CdvO3aakh4MA9JJItrtoOWQzOGfBpzJcAk2e0oeB6YYIybr-q7xMSDnH9wdTB0ruM')] bg-cover bg-center"></div>
          <div className="relative z-10 p-10 text-on-primary">
            <div className="flex items-center gap-3 mb-8">
              <Hub className="w-8 h-8" />
              <h2 className="text-3xl font-display">Faktor Pembentuk</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {factors.map((f, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                  <h3 className="text-xl mb-2">{f.title}</h3>
                  <p className="text-on-primary/80 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="md:col-span-12 mt-4 flex flex-col gap-8">
          <h2 className="text-3xl text-center text-on-surface font-display">Macam-macam Kelompok Sosial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {types.map((t, idx) => (
              <div key={idx} className="bg-surface rounded-2xl border border-outline-variant p-8 flex flex-col interactive-hover group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={cn("text-xl font-display", t.color)}>{t.title}</h3>
                  <t.icon className={cn("w-6 h-6", t.color.replace('text-', 'text-'))} />
                </div>
                <p className="text-on-surface-variant mb-6 flex-grow">{t.desc}</p>
                <div className="bg-surface-container p-4 rounded-lg text-xs font-medium text-on-surface-variant">
                  <span className="font-bold text-primary">Contoh:</span> {t.example}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
