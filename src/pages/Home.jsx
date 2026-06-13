import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import { FiArrowRight, FiShoppingBag, FiTruck, FiCreditCard, FiAward, FiStar, FiChevronRight } from 'react-icons/fi';

export default function Home() {
  const { products, loading, fetchProducts, addToCart } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Bosh sahifada faqat eng birinchi 4ta premium mahsulotni "Top" sifatida ko'rsatamiz
  const trendingProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 py-4 text-xs">
      
      {/* 🚀 1. HERO SECTION (BANNER) */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-slate-900 text-white p-6 md:p-12 shadow-xl border border-violet-500/10">
        {/* Dekorativ orqa fon elementlari */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-400/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="max-w-xl space-y-4 md:space-y-6 relative z-10">
          <p className="bg-white/20 text-white px-3 py-1 rounded-full font-black text-[10px] tracking-wider uppercase backdrop-blur-sm">
            Yozgi Katta Chegirmalar!
          </p>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
            Premium Texnikalar <br />
            <span className="text-violet-200">Endi Yanada Arzon.</span>
          </h1>
          <p className="text-white/80 leading-relaxed max-w-sm text-[11px] md:text-xs">
            E-STORE bilan eng so'nggi gadjetlar va zamonaviy noutbuklarni rasmiy kafolat hamda bepul yetkazib berish xizmati bilan xarid qiling.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link 
              to="/products" 
              className="bg-white text-violet-600 font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-50 shadow-md active:scale-95 transition-all text-xs"
            >
              <span>Xaridni boshlash</span>
              <FiArrowRight size={14} />
            </Link>
            <a 
              href="#trending" 
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-xl border border-white/10 transition-colors"
            >
              Ommabop mahsulotlar
            </a>
          </div>
        </div>
      </section>

      {/* ⚡ 2. KATEGORIYALAR VIDJETI */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">Kategoriyalar</h2>
            <p className="text-base font-black text-slate-900 dark:text-white">Yo'nalish bo'yicha qidirish</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: "Electronics", label: "Elektronika", count: "124+ mahsulot", bg: "from-blue-500/10 to-indigo-500/10 text-blue-600" },
            { name: "Jewelery", label: "Taqinchoqlar", count: "42+ mahsulot", bg: "from-amber-500/10 to-orange-500/10 text-amber-600" },
            { name: "Men's Clothing", label: "Erkaklar kiyimi", count: "85+ mahsulot", bg: "from-emerald-500/10 to-teal-500/10 text-emerald-600" },
            { name: "Women's Clothing", label: "Ayollar kiyimi", count: "96+ mahsulot", bg: "from-rose-500/10 to-pink-500/10 text-rose-600" }
          ].map((cat, idx) => (
            <Link 
              key={idx}
              to="/products"
              className={`p-4 rounded-2xl bg-gradient-to-br ${cat.bg} border border-transparent hover:border-current/10 transition-all flex flex-col justify-between h-24 group`}
            >
              <div>
                <h4 className="font-black text-xs text-slate-800 dark:text-slate-200">{cat.label}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{cat.count}</p>
              </div>
              <span className="self-end p-1 bg-white dark:bg-slate-900 rounded-lg shadow-sm group-hover:translate-x-1 transition-transform">
                <FiChevronRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔥 3. MASHHUR MAHSULOTLAR (TRENDING) */}
      <section id="trending" className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">Trendda</h2>
            <p className="text-base font-black text-slate-900 dark:text-white">Eng ko'p sotilgan mahsulotlar</p>
          </div>
          <Link to="/products" className="font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
            <span>Barchasi</span>
            <FiArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <Link to={`/products/${product.id}`} className="block relative bg-white aspect-square overflow-hidden">
                  <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 bg-rose-500 text-white font-black text-[9px] px-2 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                    <FiStar size={8} className="fill-current" /> TOP
                  </span>
                </Link>
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold">{product.category}</span>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5 hover:text-violet-600 transition-colors">{product.title}</h3>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-black text-violet-600 dark:text-violet-400">${parseFloat(product.price).toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 text-slate-700 dark:text-slate-300 font-bold p-2.5 rounded-xl cursor-pointer active:scale-95 transition-all"
                    >
                      <FiShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🌟 4. NEGA BIZ? (AFZALLIKLARIMIZ) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm transition-colors">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl shrink-0"><FiTruck size={18} /></div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Tezkor va Bepul Yetkazib Berish</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">O'zbekiston bo'ylab barcha buyurtmalaringizni 24 soat ichida mutlaqo bepul yetkazib beramiz.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl shrink-0"><FiAward size={18} /></div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">100% Original Premium Sifat</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">Bizning barcha mahsulotlarimiz ishlab chiqaruvchidan to'g'ridan-to'g'ri va rasmiy kafolatga ega.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl shrink-0"><FiCreditCard size={18} /></div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Xavfsiz Onlayn To'lov</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">Click, Payme yoki naqd pul orqali xaridlaringizni xavfsiz va kafolatlangan holda amalga oshiring.</p>
          </div>
        </div>
      </section>

    </div>
  );
}