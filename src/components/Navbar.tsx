import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Menu, LogOut, CloudUpload } from 'lucide-react';
import { cn } from '../lib/utils';
import { saveStudentProgress } from '../lib/firebaseStore';
import { LogoIcon } from './Logo';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [isSyncing, setIsSyncing] = React.useState(false);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = async () => {
    if (user?.class) {
      setIsSyncing(true);
      try {
        await saveStudentProgress(user.class, user);
      } catch (error) {
        console.error('Logout sync failed:', error);
      } finally {
        setIsSyncing(false);
      }
    }
    
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Materi', path: '/materi' },
    { name: 'Video', path: '/video' },
    { name: 'Quiz', path: '/quiz' },
  ];

  if (user?.isDosen) {
    navLinks.push({ name: 'Panel Dosen', path: '/dosen' });
  }

  return (
    <nav className="bg-surface border-b border-surface-variant shadow-sm w-full sticky top-0 z-50">
      <div className="absolute top-0 inset-x-0 h-[3.5px] bg-gradient-to-r from-primary via-secondary to-primary" />
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-20">
        <NavLink to="/dashboard" className="font-display text-xl md:text-2xl font-bold text-primary flex items-center gap-2 hover:opacity-90 transition-opacity">
          <LogoIcon className="w-10 h-10 shrink-0" color="#8C0B0C" />
          <span>Sosiologi Learning</span>
        </NavLink>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "font-medium transition-colors hover:text-primary pb-1 border-b-2 transition-all",
                  isActive 
                    ? "text-primary font-bold border-primary" 
                    : "text-on-surface-variant border-transparent"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:block font-medium text-on-surface">Halo, {user?.name || 'Pelajar'}!</span>
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-outline overflow-hidden">
            <User className="w-6 h-6" />
          </div>
          
          <button 
            onClick={handleLogout}
            disabled={isSyncing}
            className="hidden md:flex items-center justify-center p-2 text-on-surface-variant hover:text-error hover:bg-error/5 rounded-lg transition-colors group disabled:opacity-50"
            title="Keluar & Simpan Progres"
          >
            {isSyncing ? (
              <CloudUpload className="w-5 h-5 animate-bounce text-primary" />
            ) : (
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>

          <button 
            className="md:hidden p-2 hover:bg-surface-container rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-b border-surface-variant p-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "block px-4 py-2 rounded-lg font-medium transition-colors",
                  isActive 
                    ? "bg-primary-fixed text-primary font-bold" 
                    : "text-on-surface-variant hover:bg-surface-container"
                )
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-error hover:bg-error/5 transition-colors border-t border-surface-variant pt-4 mt-2"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      )}
    </nav>
  );
}
