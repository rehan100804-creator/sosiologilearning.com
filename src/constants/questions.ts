export interface Option {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface Question {
  id: number;
  q: string;
  opts: Option[];
  correct: string; // 'A', 'B', 'C', 'D'
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    q: "Sekelompok siswa yang sering belajar bersama karena memiliki tujuan yang sama termasuk contoh kelompok sosial berdasarkan ....",
    opts: [
      { id: "A", text: "Keturunan" },
      { id: "B", text: "Kepentingan bersama" },
      { id: "C", text: "Wilayah geografis" },
      { id: "D", text: "Paksaan" }
    ],
    correct: "B",
    explanation: "Kelompok belajar bersama dibentuk atas dasar kesepakatan keinginan dan tujuan yang sama dalam bidang akademik, yang mencerminkan kepentingan bersama (interest-based)."
  },
  {
    id: 2,
    q: "Kelompok sosial yang memiliki aturan resmi, struktur organisasi, dan pembagian tugas disebut ....",
    opts: [
      { id: "A", text: "Kelompok primer" },
      { id: "B", text: "Kelompok informal" },
      { id: "C", text: "Kelompok formal" },
      { id: "D", text: "Kelompok sekunder kecil" }
    ],
    correct: "C",
    explanation: "Kelompok formal memiliki struktur yang jelas, AD/ART/aturan yang formal, dan pembagian kerja yang teratur dan disepakati oleh seluruh anggotanya."
  },
  {
    id: 3,
    q: "Contoh kelompok primer adalah ....",
    opts: [
      { id: "A", text: "Organisasi OSIS" },
      { id: "B", text: "Partai politik" },
      { id: "C", text: "Keluarga" },
      { id: "D", text: "Perusahaan" }
    ],
    correct: "C",
    explanation: "Keluarga adalah contoh utama kelompok primer di mana hubungan antar anggota bersifat akrab, intim, tatap muka langsung, pribadi, dan permanen."
  },
  {
    id: 4,
    q: "Kelompok sosial yang hubungan antar anggotanya bersifat tidak pribadi dan formal disebut ....",
    opts: [
      { id: "A", text: "Kelompok primer" },
      { id: "B", text: "Kelompok sekunder" },
      { id: "C", text: "Paguyuban" },
      { id: "D", text: "Komunitas adat" }
    ],
    correct: "B",
    explanation: "Kelompok sekunder memiliki ciri hubungan yang formal, tidak bersifat pribadi, berorientasi tujuan secara fungsional, fana (jangka waktu tertentu), dan rasional."
  },
  {
    id: 5,
    q: "Menurut Ferdinand Tönnies, kelompok yang hubungan antar anggotanya erat dan bersifat kekeluargaan disebut ....",
    opts: [
      { id: "A", text: "Gesellschaft" },
      { id: "B", text: "Organisasi" },
      { id: "C", text: "Gemeinschaft" },
      { id: "D", text: "Asosiasi" }
    ],
    correct: "C",
    explanation: "Gemeinschaft (paguyuban) adalah bentuk kehidupan bersama yang mendalam, intim, dan personal di mana para anggotanya diikat oleh hubungan batin murni yang bersifat alamiah dan kekal."
  },
  {
    id: 6,
    q: "Berikut yang termasuk contoh kelompok informal adalah ....",
    opts: [
      { id: "A", text: "Sekolah" },
      { id: "B", text: "Persahabatan" },
      { id: "C", text: "Perusahaan" },
      { id: "D", text: "DPR" }
    ],
    correct: "B",
    explanation: "Persahabatan (peer group) terbentuk secara spontan tanpa aturan tertulis, birokrasi, atau struktur organisasi formal, sehingga diklasifikasikan sebagai kelompok informal."
  },
  {
    id: 7,
    q: "Suatu kelompok dapat disebut kelompok sosial apabila memiliki ....",
    opts: [
      { id: "A", text: "Musuh yang sama" },
      { id: "B", text: "Interaksi antar anggota" },
      { id: "C", text: "Kekayaan yang sama" },
      { id: "D", text: "Tempat tinggal mewah" }
    ],
    correct: "B",
    explanation: "Syarat utama kelompok sosial adalah adanya kesadaran bersama, hubungan timbal balik (interaksi), adanya faktor pengikat (kesamaan rasul/nasib/minat), berstruktur, dan berproses."
  },
  {
    id: 8,
    q: "Kelompok acuan yang dijadikan pedoman seseorang dalam bersikap disebut ....",
    opts: [
      { id: "A", text: "Out-group" },
      { id: "B", text: "Membership group" },
      { id: "C", text: "Reference group" },
      { id: "D", text: "Kelompok primer" }
    ],
    correct: "C",
    explanation: "Reference group (kelompok acuan/referensi) adalah kelompok sosial yang menjadi acuan bagi seseorang untuk membentuk kepribadian dan perilakunya, meskipun orang tersebut bukan anggota resmi kelompok tersebut."
  },
  {
    id: 9,
    q: "Seseorang menjadi anggota resmi suatu kelompok disebut ....",
    opts: [
      { id: "A", text: "Reference group" },
      { id: "B", text: "Membership group" },
      { id: "C", text: "Paguyuban" },
      { id: "D", text: "Patembayan" }
    ],
    correct: "B",
    explanation: "Membership group adalah kelompok di mana setiap orang secara fisik dan administratif menjadi anggota resmi/sah dari kelompok sosial tersebut."
  },
  {
    id: 10,
    q: "Perasaan “kami” dalam suatu kelompok disebut ....",
    opts: [
      { id: "A", text: "Solidaritas" },
      { id: "B", text: "Integrasi" },
      { id: "C", text: "Simpati" },
      { id: "D", text: "Individualisme" }
    ],
    correct: "A",
    explanation: "Solidaritas (dalam in-group feeling) merujuk pada perasaan kebersamaan, rasa satu kesatuan, loyalitas, dan simpati antar sesama anggota kelompok terhadap kelompoknya sendiri."
  },
  {
    id: 11,
    q: "Kelompok yang terbentuk secara alami karena ikatan darah disebut ....",
    opts: [
      { id: "A", text: "Kelompok okupasional" },
      { id: "B", text: "Kelompok genealogis" },
      { id: "C", text: "Kelompok formal" },
      { id: "D", text: "Kelompok sekunder" }
    ],
    correct: "B",
    explanation: "Kelompok genealogis dibentuk berdasarkan faktor keturunan atau ikatan darah (ikatan kekeluargaan primer)."
  },
  {
    id: 12,
    q: "Organisasi profesi guru termasuk kelompok sosial berdasarkan ....",
    opts: [
      { id: "A", text: "Keturunan" },
      { id: "B", text: "Persahabatan" },
      { id: "C", text: "Pekerjaan" },
      { id: "D", text: "Wilayah" }
    ],
    correct: "C",
    explanation: "Persatuan Guru Republik Indonesia (PGRI) merupakan himpunan profesi atau kelompok okupasional berdasarkan kesamaan pekerjaan atau keahlian di bidang mendidik."
  },
  {
    id: 13,
    q: "Berikut yang termasuk out-group adalah ....",
    opts: [
      { id: "A", text: "Kelompok sendiri" },
      { id: "B", text: "Kelompok yang dianggap lawan" },
      { id: "C", text: "Keluarga inti" },
      { id: "D", text: "Kelompok bermain" }
    ],
    correct: "B",
    explanation: "Out-group (kelompok luar) merupakan kelompok sosial yang oleh individu diidentifikasi sebagai lawan atau di luar kelompok kami (in-group)."
  },
  {
    id: 14,
    q: "Kelompok sosial yang terbentuk karena adanya tujuan tertentu disebut ....",
    opts: [
      { id: "A", text: "Kelompok semu" },
      { id: "B", text: "Kelompok formal" },
      { id: "C", text: "Kelompok okupasional" },
      { id: "D", text: "Kerumunan" }
    ],
    correct: "B",
    explanation: "Kelompok formal sengaja dibentuk oleh sekelompok manusia dengan aturan serta birokrasi yang tertata demi mencapai tujuan tertentu yang spesifik dan rasional."
  },
  {
    id: 15,
    q: "Sekumpulan orang di terminal yang sedang menunggu bus termasuk ....",
    opts: [
      { id: "A", text: "Kelompok sosial tetap" },
      { id: "B", text: "Organisasi sosial" },
      { id: "C", text: "Kerumunan" },
      { id: "D", text: "Paguyuban" }
    ],
    correct: "C",
    explanation: "Orang-orang yang berkumpul secara kebetulan dan tanpa ikatan terorganisasi di terminal bus merupakan sebuah kerumunan (crowd), yang sifatnya sementara dan tidak berstruktur."
  },
  {
    id: 16,
    q: "Salah satu ciri kelompok sosial adalah ....",
    opts: [
      { id: "A", text: "Tidak memiliki norma" },
      { id: "B", text: "Tidak terjadi interaksi" },
      { id: "C", text: "Memiliki kesadaran bersama" },
      { id: "D", text: "Bersifat sementara saja" }
    ],
    correct: "C",
    explanation: "Ciri mendasar kelompok sosial mencakup kesadaran bersama sebagai satu kesatuan, struktur atau pola perilaku yang teratur, dan ada rasa saling bergantung antar anggota."
  },
  {
    id: 17,
    q: "Kelompok yang hubungan antar anggotanya didasarkan pada kepentingan pribadi disebut ....",
    opts: [
      { id: "A", text: "Gemeinschaft" },
      { id: "B", text: "Paguyuban" },
      { id: "C", text: "Patembayan" },
      { id: "D", text: "Kelompok primer" }
    ],
    correct: "C",
    explanation: "Patembayan (Gesellschaft) adalah ikatan lahiriah yang berorientasi fungsional, fana, dan sering kali didasari kepentingan pribadi atau rasional (utilitarian)."
  },
  {
    id: 18,
    q: "Contoh kelompok sekunder adalah ....",
    opts: [
      { id: "A", text: "Sahabat dekat" },
      { id: "B", text: "Keluarga" },
      { id: "C", text: "Organisasi perusahaan" },
      { id: "D", text: "Kelompok bermain anak" }
    ],
    correct: "C",
    explanation: "Organisasi perusahaan merupakan kelompok sekunder karena ikatannya bercorak formal, kontraktual, fungsional, dan tidak bersifat pribadi dekat layaknya hubungan keluarga."
  },
  {
    id: 19,
    q: "Kelompok sosial yang muncul akibat adanya perhatian sesaat terhadap suatu objek disebut ....",
    opts: [
      { id: "A", text: "Massa" },
      { id: "B", text: "Publik" },
      { id: "C", text: "Kerumunan" },
      { id: "D", text: "Organisasi" }
    ],
    correct: "C",
    explanation: "Kerumunan (casual crowd) dirangsang oleh perhatian seketika pada hal yang sama (misalkan sirkus jalanan atau kecelakaan lalu lintas)."
  },
  {
    id: 20,
    q: "Faktor utama terbentuknya kelompok sosial adalah ....",
    opts: [
      { id: "A", text: "Interaksi sosial" },
      { id: "B", text: "Persamaan warna kulit" },
      { id: "C", text: "Persamaan kekayaan" },
      { id: "D", text: "Persamaan status ekonomi" }
    ],
    correct: "A",
    explanation: "Interaksi sosial yang kontinu, timbal balik, dan memiliki tujuan bersama adalah pilar fundamental terbentuknya kesadaran berkelompok dalam sosiologi."
  }
];
