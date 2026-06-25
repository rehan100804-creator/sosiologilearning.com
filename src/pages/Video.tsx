import { PlayCircle, Clock, ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { saveStudentProgress } from '../lib/firebaseStore';

export default function Video() {
  const videos = [
    { 
      title: 'Video Pembelajaran Kelompok Sosial 1', 
      part: 'Bagian 1', 
      time: '12:45', 
      desc: 'Memahami konsep dasar, definisi, dan syarat terbentuknya sebuah kelompok sosial dalam interaksi masyarakat modern.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxs1Q6otsaaHQjbezOhS_6SjNvdPe0n22OpMPHlvf_wmXNPWzG4gdAcFA8iKsSdj47vec4uEH03o22Zc85AGjI85hwu_DsAKxqB8_qIH8PAcvPyxwp2IK7894n9zlPSuL9hgUXFBha_zyCRFNFc7k5Ame8A87_luPF4KTMT5ZkBoDcGQ7uLOEPf-E9PAFQu-TRh5NjgaWCeKzkumRXOSy2Z8Q0oyvvd6kFZgEssi5ceEO2zWROLakHGZL2va6KP4wDF8LvdlA0_aLP',
      url: 'https://youtu.be/CyGEjZiM9fk?si=K4Db4OqEa0YQ792G'
    },
    { 
      title: 'Video Pembelajaran Kelompok Sosial 2', 
      part: 'Bagian 2', 
      time: '15:20', 
      desc: 'Klasifikasi dan jenis-jenis kelompok sosial menurut para ahli sosiologi, dari kelompok primer hingga sekunder.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHW0Y1CUgw5xgqLT2tS0emE56_dtiKGVwADPYiKBQbFelCR30q4Z6kA-U29UMxTweLsYC5YNw7Xb04Kr5bx9h5LsYujB8yCsotJDzGBv_xn0l7b-1nVncdJQPC_iavvExJNUWnXZ_0NkLc3Vd2zwWtwzG4zI0Q98YUzgj7xpQFL9rw0WZI116BzS_IqIZ5Y2wOkbc0Gy7ui5-3qB0j9UdiORWeDX43auq3xff-_RW6MkkukBqkSDN4LG3siu_Dmr9vjiOYlU4MHyZ_',
      url: 'https://youtu.be/-GePFL9PTGg?si=ZqIiYBqnFLyA4NeZ'
    },
    { 
      title: 'Video Pembelajaran Kelompok Sosial 3', 
      part: 'Bagian 3', 
      time: '18:05', 
      desc: 'Dinamika kelompok sosial: faktor pendorong, proses perkembangan, dan pola hubungan antar kelompok.', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCffV_Ewd_MaTtP5S29HKdA1zLLceVQb4FwJJkaTq7s_ldZ64wV0sAbn_i3gcnXKHVuL0YLarykRLUsJPX0BsYL5mCzJzvYk-f_v9cNBSQVWgsDF6OUASsk70NRX-8Z75HlXCaNsKEu98ybCY8EgsRiH6D7lguGKOt_rUfWssUCaKfaY4UkbkZzrkX2iuJNCtwQg8Agy6iI_STrn9q_yrI5BJA5seR9nT0pVWuT10gNdwY0KEGGxhDPVagQ1VUJjfu4y_u0Wf-t26gO',
      url: 'https://youtu.be/HOjCtLHNlsA?si=Q7KlpFZjS1RbuLKv'
    },
  ];

  const handleTrack = async () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      userData.watchedVideo = true;
      localStorage.setItem('user', JSON.stringify(userData));
      if (userData.class) {
        try {
          await saveStudentProgress(userData.class, userData);
        } catch (err) {
          console.error('Failed to sync video completion:', err);
        }
      }
    }
  };

  return (
    <div className="w-full px-4 md:px-8 max-w-7xl mx-auto py-10">
      <div className="mb-10">
        <NavLink to="/dashboard" className="inline-flex items-center gap-2 text-primary font-bold mb-4 hover:underline">
          <ChevronLeft className="w-5 h-5" /> Kembali ke Dashboard
        </NavLink>
        <h1 className="text-4xl text-on-surface mb-2 font-display">Materi Pembelajaran Video</h1>
        <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">Eksplorasi mendalam mengenai struktur, jenis, dan dinamika kelompok sosial dalam masyarakat melalui seri video interaktif.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid, idx) => (
          <a 
            key={idx} 
            href={vid.url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleTrack}
            className="bg-surface rounded-2xl border border-surface-variant overflow-hidden interactive-hover group cursor-pointer flex flex-col"
          >
            <div className="relative aspect-video bg-surface-container overflow-hidden">
              <img src={vid.img} alt={vid.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-on-surface flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {vid.time}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <PlayCircle className="w-10 h-10 fill-current" />
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="bg-primary-fixed text-primary font-bold text-[10px] uppercase tracking-widest px-2 py-1 rounded w-fit mb-3">{vid.part}</span>
              <h3 className="text-xl text-on-surface mb-3 group-hover:text-primary transition-colors font-display">{vid.title}</h3>
              <p className="text-sm text-on-surface-variant line-clamp-3 leading-relaxed">{vid.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
