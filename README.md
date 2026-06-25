# Sosiologi Learning 🏫✨

**Sosiologi Learning** adalah platform pembelajaran sosiologi modern interaktif yang dirancang khusus untuk siswa SMA, dengan fokus pada materi **Kelompok Sosial**. Platform ini menggabungkan fungsionalitas teknologi modern dengan sentuhan warisan budaya Nusantara yang elegan dan minimalis. 

Desain visual aplikasi ini terinspirasi dari estetika **Minangkabau (Sumatra Barat)**, memadukan sketsa minimalis **Rumah Gadang** dengan latar belakang bermotif **Songket Emas-Merah Kerajaan (Gold & Maroon Wallpaper)** yang sangat berkelas, bersih, dan profesional.

---

## 🎨 Konsep Desain & Estetika Warisan Budaya (Heritage Theme)

Aplikasi ini menggunakan pendekatan desain premium yang melampaui visual default:
- **Nuansa Warna Premium**: Menggunakan palet merah maroon megah (*Royal Red* `#8C0B0C` & `#7A0C16`) yang dikombinasikan dengan sentuhan warna emas songket (*Songket Gold* `#C5A059`) dan latar belakang putih-krem gading lembut (`#FAF8F5`) yang sangat nyaman di mata.
- **Ilustrasi Sketsa Rumah Gadang**: Komponen vektor buatan tangan (hand-drawn style) bermotif garis minimalis modern yang menghiasi halaman login dan dashboard, merepresentasikan nilai-nilai sosiologi kemasyarakatan dan adat Nusantara yang guyub dan terstruktur.
- **Wallpaper Songket Emas**: Overlay pola ornamen songket geometric khas yang sangat halus pada kartu/panel login dan dashboard untuk menciptakan ritme visual yang anggun tanpa mengalihkan fokus belajar siswa.
- **Tipografi Indah**: Menggunakan kombinasi font **Montserrat** untuk heading bergaya display yang tegas, **Inter** untuk teks antarmuka yang sangat bersih dan mudah dibaca, serta **JetBrains Mono** untuk representasi data teknis seperti NIM presensi.

---

## 🚀 Fitur Utama Platform

1. **Sistem Validasi Presensi Siswa (Secure Login)**
   - Sistem masuk kelas yang aman berbasis validasi database statis presensi siswa sosiologi (`src/constants/students.ts`).
   - Mencegah akses siswa di luar daftar presensi resmi kelas dan melacak progress unik untuk masing-masing siswa.
   - Pilihan cepat tautan bantuan WhatsApp Developer jika siswa mengalami kendala sistem atau lupa NIM.

2. **Dashboard Interaktif & Pelacakan Progress**
   - Menampilkan salam personal dinamis berdasarkan profil pengguna (Pelajar atau Dosen Aktif).
   - Indikator kemajuan belajar (*Learning Progress Bar*) yang diperbarui secara otomatis seiring siswa membaca materi, menonton video, dan menyelesaikan kuis.
   - Kartu navigasi interaktif (*Materi*, *Video*, *Quiz*, *Hasil*) yang memiliki animasi hover melayang (*interactive-hover*) dan penanda status "Selesai" jika tugas telah diselesaikan.

3. **Modul Materi Sosiologi (Kelompok Sosial)**
   - Penyajian teks modul sosiologi terstruktur dengan navigasi antar sub-bab yang responsif.
   - Menampilkan penjelasan yang rapi mengenai definisi, jenis-jenis kelompok sosial, serta dinamika sosial di masyarakat.

4. **Kanal Video Pembelajaran**
   - Pemutar video pembelajaran interaktif terintegrasi yang menyajikan visualisasi kelompok sosial dengan format modern.

5. **Kuis Latihan & Evaluasi Real-time**
   - Lembar kuis dengan pilihan ganda interaktif didukung animasi transisi yang sangat halus menggunakan `motion`.
   - Menampilkan hasil skor, kalkulasi jawaban benar/salah, serta tinjauan ulang (*review*) jawaban secara detail guna meningkatkan pemahaman siswa.

6. **Durable Cloud Persistence (Firebase Firestore)**
   - Integrasi real-time dengan Firebase Firestore untuk menyimpan progres pengerjaan modul, status menonton video, dan skor akhir kuis siswa.
   - Data tersimpan secara permanen sehingga progress belajar tidak akan hilang meskipun cache browser dibersihkan atau siswa berganti perangkat.

---

## 📂 Struktur Direktori Proyek

Agar mempermudah pembacaan kode di GitHub, berikut adalah peta arsitektur folder utama dalam proyek ini:

```text
├── .env.example                # Template variabel lingkungan (Gemini API, dll)
├── .gitignore                  # Berkas pengecualian Git (node_modules, dist, .env)
├── firebase-applet-config.json # Konfigurasi integrasi Firebase SDK
├── firebase-blueprint.json     # Cetak biru database Firestore & aturan indeks
├── firestore.rules             # Aturan keamanan akses Firebase Firestore
├── index.html                  # Titik masuk utama dokumen HTML
├── metadata.json               # Metadata aplikasi AI Studio (izin frame & capabilities)
├── package.json                # Pengelola dependensi npm dan skrip build/dev
├── tsconfig.json               # Konfigurasi compiler TypeScript
├── vite.config.ts              # Konfigurasi bundler Vite + Tailwind CSS plugin
│
└── src/                        # Sumber Kode Utama Aplikasi
    ├── App.tsx                 # Router utama dan struktur navigasi global
    ├── main.tsx                # Titik masuk React 19 (rendering DOM)
    ├── index.css               # CSS global yang mendefinisikan palet warna warisan budaya
    │
    ├── components/             # Komponen UI yang Modular
    │   ├── Logo.tsx            # Logo vektor Sosiologi Learning yang elegan
    │   ├── Navbar.tsx          # Bar navigasi atas yang dilengkapi garis gradasi dinamis
    │   ├── Footer.tsx          # Footer bawah yang bersih dan berlogo
    │   └── HeritageDecorations.tsx # Ilustrasi sketsa Rumah Gadang, Medali Emas, & Wallpaper Pattern
    │
    ├── constants/              # Data Statis / Konfigurasi Pembelajaran
    │   ├── questions.ts        # Daftar soal kuis sosiologi pilihan ganda
    │   └── students.ts         # Database daftar nama & NIM presensi kelas siswa resmi
    │
    ├── lib/                    # Utilitas, Helper, dan Integrasi SDK
    │   ├── firebaseStore.ts    # Driver & Handler interaksi database Firestore (Save/Get progress)
    │   ├── utils.ts            # Fungsi utilitas global (Tailwind class merger)
    │   └── auth.ts             # Logika otentikasi sesi siswa lokal
    │
    └── pages/                  # Halaman Tampilan Utama (Views)
        ├── Login.tsx           # Halaman login estetik bermotif songket & Rumah Gadang
        ├── Dashboard.tsx       # Beranda utama belajar siswa dengan progress bar
        ├── Materi.tsx          # Halaman membaca modul kelompok sosial
        ├── Video.tsx           # Halaman menonton video materi pembelajaran
        ├── Quiz.tsx            # Halaman pengerjaan kuis interaktif berwaktu
        ├── Result.tsx          # Halaman pengumuman hasil skor kuis siswa
        ├── Review.tsx          # Halaman evaluasi peninjauan jawaban salah/benar
        └── Dosen.tsx           # Panel khusus Dosen untuk merekapitulasi nilai seluruh siswa
```

---

## 🛠️ Cara Menjalankan Aplikasi Secara Lokal

Ikuti langkah-langkah mudah di bawah ini untuk memasang dan menjalankan aplikasi ini di komputer lokal Anda:

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Sangat direkomendasikan versi 18 ke atas)
- npm (bawaan dari instalasi Node.js)

### 2. Kloning Repositori
Kloning repositori ini menggunakan Git:
```bash
git clone <url-repositori-github-anda>
cd sosiologi-learning
```

### 3. Instalasi Dependensi
Jalankan perintah berikut untuk menginstal semua pustaka pendukung yang diperlukan:
```bash
npm install
```

### 4. Konfigurasi Variabel Lingkungan & Firebase
Aplikasi ini membutuhkan integrasi Firebase. 
1. Buat proyek baru di [Firebase Console](https://console.firebase.google.com/).
2. Aktifkan **Cloud Firestore** database.
3. Buat aplikasi web di Firebase Anda, lalu salin konfigurasinya ke dalam file bernama `firebase-applet-config.json` di direktori utama (root):
   ```json
   {
     "projectId": "PROYEK_FIREBASE_ANDA",
     "appId": "APP_ID_ANDA",
     "apiKey": "API_KEY_ANDA",
     "authDomain": "AUTH_DOMAIN_ANDA",
     "firestoreDatabaseId": "(default)",
     "storageBucket": "STORAGE_BUCKET_ANDA",
     "messagingSenderId": "SENDER_ID_ANDA"
   }
   ```
4. Salin file `.env.example` menjadi `.env` dan sesuaikan nilainya bila Anda menggunakan integrasi Gemini API.

### 5. Jalankan Server Pengembangan (Local Dev Server)
Jalankan perintah ini untuk memulai server lokal dengan fitur Hot Module Replacement (HMR) aktif:
```bash
npm run dev
```
Setelah berjalan, buka browser kesayangan Anda dan akses tautan:
👉 **`http://localhost:3000`**

### 6. Build Produksi (Build for Production)
Untuk mengompilasi kode menjadi file HTML, CSS, dan JavaScript statis siap pakai di hosting produksi:
```bash
npm run build
```
File hasil build akan berada di dalam direktori `/dist` dan siap diunggah ke platform seperti Vercel, Netlify, Firebase Hosting, atau GitHub Pages.

---

## 🛡️ Aturan Keamanan & Linting

Proyek ini mempertahankan standar kualitas kode yang sangat ketat:
- **Linter**: Lakukan pemeriksaan tipe dan sintaksis dengan menjalankan perintah `npm run lint` (`tsc --noEmit`).
- **Aturan Keamanan Firestore**: Aturan keamanan penulisan data siswa telah disiapkan di berkas `firestore.rules` untuk memastikan integritas data progres belajar siswa terjaga dari modifikasi yang tidak sah.

---

## 🤝 Kontribusi

Kontribusi selalu terbuka! Jika Anda ingin meningkatkan kualitas platform pembelajaran ini (seperti menambah bank soal sosiologi, menambah modul, atau memperindah animasi UI):
1. Lakukan *Fork* pada repositori ini.
2. Buat branch baru untuk fitur Anda (`git checkout -b fitur-baru-keren`).
3. Lakukan komit perubahan Anda (`git commit -m 'Menambahkan fitur baru yang keren'`).
4. Push ke branch Anda (`git push origin fitur-baru-keren`).
5. Buat sebuah *Pull Request* baru di GitHub.

Platform ini didekasikan untuk memajukan kualitas pendidikan Sosiologi di Indonesia. **Mari belajar bersama, lebih pintar bersama!** 🎓🇮🇩
