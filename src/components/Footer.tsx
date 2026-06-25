import { NavLink } from 'react-router-dom';
import { LogoIcon } from './Logo';

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 py-10 max-w-7xl mx-auto gap-6 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <div className="font-display text-xl font-bold text-primary flex items-center justify-center md:justify-start gap-2">
            <LogoIcon className="w-7 h-7 shrink-0" color="#8C0B0C" />
            Sosiologi Learning
          </div>
          <p className="text-on-surface-variant text-sm">© 2024 Sosiologi Learning. Smarter Together.</p>
        </div>

        <div className="flex gap-6 flex-wrap justify-center font-medium">
          <a href="https://drive.google.com/file/d/1a_-YzHu_ySr1PeRFaJJ4wnSfy-eIYYyp/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-secondary hover:underline transition-colors">Tentang Kami</a>
          <a href="https://drive.google.com/file/d/14WFHYCNMcTjo5AIJkx2cLQVCrAC0kMdZ/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-secondary hover:underline transition-colors">Panduan Belajar</a>
          <a href="https://drive.google.com/file/d/1l06pfkkkv4_wMjxSAVu2SS4EWZb1ZgCe/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-secondary hover:underline transition-colors">Kebijakan Privasi</a>
          <a href="https://wa.link/52ueu2" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-secondary hover:underline transition-colors">Kontak</a>
        </div>
      </div>
    </footer>
  );
}
