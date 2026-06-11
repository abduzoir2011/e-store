import { useState } from 'react';
import { FiX, FiMail, FiLock, FiUser } from 'react-icons/fi';
import useAuthStore from '../store/useAuthStore';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: isSignUp ? name : email.split('@')[0],
      email: email
    });
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={closeAuthModal} />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-2xl z-10 animate-fade-in animate-scale-up">
        <button onClick={closeAuthModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition">
          <FiX size={20} />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">{isSignUp ? "Hisob yaratish" : "Xush kelibsiz"}</h3>
          <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-1">{isSignUp ? "Ro'yxatdan o'tish uchun inputlarni to'ldiring" : "Velocity profilingizga kiring"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To'liq ismingiz</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-950 dark:text-white pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-sm font-medium outline-none" placeholder="Ali Valiyev" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email manzil</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-950 dark:text-white pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-sm font-medium outline-none" placeholder="example@mail.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Parol</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-950 dark:text-white pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-sm font-medium outline-none" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full bg-slate-950 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-bold py-4 rounded-xl transition shadow-lg">
            {isSignUp ? "Ro'yxatdan o'tish" : "Tizimga kirish"}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm">
          <span className="text-slate-400 font-medium">{isSignUp ? "Profilingiz bormi? " : "Yangi foydalanuvchisiz? "}</span>
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-violet-600 dark:text-violet-400 font-bold hover:underline">
            {isSignUp ? "Tizimga kirish" : "Hisob yaratish"}
          </button>
        </div>
      </div>
    </div>
  );
}