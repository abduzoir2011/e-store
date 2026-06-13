import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import useProductStore from '../store/useProductStore';

export default function Navbar({ onCartOpen }) {
  const { cart } = useProductStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-lg font-black tracking-wider text-violet-600 dark:text-violet-400 uppercase">
          E-STORE
        </Link>

        <div className="flex items-center gap-2 md:gap-4 order-2 md:order-3">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer hover:text-violet-600 transition-all active:scale-95 text-xs"
          >
            {darkMode ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>

          <button 
            onClick={onCartOpen}
            className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer hover:text-violet-600 transition-colors flex items-center justify-center font-bold text-xs"
          >
            <FiShoppingCart size={15} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 cursor-pointer hover:text-violet-600"
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400 order-2">
          <Link to="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Bosh sahifa</Link>
          <Link to="/products" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Katalog</Link>
          <Link to="/dashboard" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-slate-900 dark:text-white">
            Admin Panel
          </Link>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 text-xs font-bold flex flex-col shadow-inner animate-fade-in">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300">Bosh sahifa</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)} className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300">Katalog</Link>
          <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 text-center">
            Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
} 