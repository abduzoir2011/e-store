import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, FiShield, FiTruck, FiZap, 
  FiTrendingUp, FiAward, FiUsers, FiChevronDown,
  FiInstagram, FiSend, FiFacebook, FiMapPin, FiPhone 
} from 'react-icons/fi';

const faqData = [
  { 
    q: "Mahsulotlar originalmi va ularga kafolat beriladimi?", 
    a: "Ha, do'konimizdagi barcha elektronika, zargarlik va kiyim-kechak mahsulotlari 100% original hisoblanadi. Har bir mahsulot ishlab chiqaruvchining rasmiy muhrlangan kafolat taloni bilan birga eshigingizgacha yetkazib beriladi." 
  },
  { 
    q: "Yetkazib berish narxi qancha va u qancha vaqt oladi?", 
    a: "Yetkazib berish xizmati respublika bo'ylab mutlaqo BEPUL. Toshkent shahri ichida buyurtmalar 4 soat ichida, viloyat markazlariga esa uzoog'i bilan 24 soat ichida kuryerlarimiz tomonidan yetkaziladi." 
  },
  { 
    q: "To'lov turlari qanday? Oldindan to'lov qilish shartmi?", 
    a: "Yo'q, oldindan to'lov qilish shart emas! Siz buyurtmaning o'zini qo'lingizga olib, tekshirib ko'rganingizdan so'ng naqd pulda yoki Click, Payme ilovalari orqali joyida to'lov qilishingiz mumkin." 
  },
  { 
    q: "Mahsulot yoqmasa yoki o'lchami tushmasa, qaytarib bersa bo'ladimi?", 
    a: "Albatta. Iste'molchilar huquqlarini himoya qilish qonuniga asosan, mahsulotga zarar yetmagan bo'lsa, 14 kun ichida uni mutlaqo boshqa o'lchamga almashtirishingiz yoki pulingizni qaytarib olishingiz mumkin." 
  }
];

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-24 py-6 text-slate-900 dark:text-slate-100 bg-transparent">
      
      {/* HERO BANNER */}
      <div className="relative overflow-hidden bg-slate-950 rounded-[2.5rem] p-8 md:p-20 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-violet-300 text-xs font-semibold uppercase tracking-wide">
            ⚡ Yangi Kolleksiya 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Kelajak texnologiyasi va uslubi.
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Premium Sifat, minimalist dizayn va eksklyuziv mahsulotlar to'plami.
          </p>
          <div className="pt-2">
            <Link to="/products" className="inline-flex bg-white text-slate-950 font-bold px-6 py-3 rounded-xl items-center gap-2 hover:bg-violet-600 hover:text-white transition-all shadow-xl group">
              Katalogni ko'rish <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ADVANTAGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <FiTruck size={22} />, title: "Ekspress Yetkazib Berish", desc: "Butun respublika bo'ylab 24 soat ichida eshikkacha bepul xizmat." },
          { icon: <FiShield size={22} />, title: "Rasmiy Kafolat", desc: "Har bir mahsulot uchun 1 yillik original ishlab chiqaruvchi kafolati." },
          { icon: <FiZap size={22} />, title: "Tezkor Yordam", desc: "Sizga yordam berishga tayyor 24/7 onlayn professional operatorlar." }
        ].map((feat, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl flex items-center justify-center mb-4">
              {feat.icon}
            </div>
            <h3 className="text-md font-bold text-slate-900 dark:text-white mb-1">{feat.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* STATS SECTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-sm">
        {[
          { icon: <FiUsers className="mx-auto text-violet-500" size={18} />, value: "10,000+", label: "Mijozlar" },
          { icon: <FiTrendingUp className="mx-auto text-violet-500" size={18} />, value: "40+", label: "Mahsulotlar" },
          { icon: <FiAward className="mx-auto text-violet-500" size={18} />, value: "100%", label: "Original Sifat" },
          { icon: <FiZap className="mx-auto text-violet-500" size={18} />, value: "24/7", label: "Tezkor Tizim" }
        ].map((stat, idx) => (
          <div key={idx} className="space-y-1">
            {stat.icon}
            <h4 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Tez-tez beriladigan savollar</h2>
        </div>

        <div className="space-y-3">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer select-none outline-none"
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-violet-500' : 'bg-slate-400'}`} /> 
                    {item.q}
                  </span>
                  <FiChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-violet-500' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PREMIUM FOOTER */}
      <footer className="border-t border-slate-100 dark:border-slate-800 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-500 dark:text-slate-400">
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-950 dark:text-white tracking-widest">E-STORE</h3>
            <p className="text-[11px] leading-relaxed">Sifat va ishonchni qadrlaydiganlar uchun zamonaviy onlayn do'kon.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Aloqa</h4>
            <p className="flex items-center gap-2"><FiPhone /> +998 (71) 123-4567</p>
            <p className="flex items-center gap-2"><FiMapPin /> Toshkent sh., Chilonzor</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Bizni kuzating</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-violet-600 rounded-lg text-slate-600 dark:text-slate-300"><FiSend size={16} /></a>
              <a href="#" className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-violet-600 rounded-lg text-slate-600 dark:text-slate-300"><FiInstagram size={16} /></a>
              <a href="#" className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-violet-600 rounded-lg text-slate-600 dark:text-slate-300"><FiFacebook size={16} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-center text-[10px] text-slate-400">
          © 2026 Premium Shop. Barcha huquqlar himoyalangan.
        </div>
      </footer>

    </div>
  );
}