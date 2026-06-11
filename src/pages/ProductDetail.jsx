import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductStore from '../store/useProductStore';
import { FiShoppingCart, FiArrowLeft, FiShield, FiTruck, FiRotateCcw } from 'react-icons/fi';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, fetchProducts } = useProductStore();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) setProduct(found);
  }, [products, id]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-2 text-xs">
      {/* Orqaga qaytish */}
      <Link to="/products" className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-violet-600 transition-colors">
        <FiArrowLeft size={14} /> Orqaga katalogga
      </Link>

      {/* 🏛️ DETAL GRID (Mobilda 1 ustun, Desktopda 2 ustun yonma-yon) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-slate-900 p-4 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        
        {/* Rasm qismi (Mobilda moslashuvchan, maksimal balandligi cheklangan) */}
        <div className="w-full aspect-square md:max-h-[450px] bg-white rounded-2xl overflow-hidden border border-slate-50 p-4 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
        </div>

        {/* Ma'lumotlar qismi */}
        <div className="flex flex-col justify-between space-y-6 py-2">
          <div className="space-y-3">
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-lg uppercase tracking-wider text-[10px]">{product.category}</span>
            <h1 className="text-base md:text-xl font-black text-slate-950 dark:text-white leading-snug">{product.title}</h1>
            <p className="text-slate-400 dark:text-slate-500 leading-relaxed">
              Ushbu premium darajadagi mahsulot o'zining yuqori sifati, zamonaviy dizayni va uzoq muddatli kafolati bilan ajralib turadi. Kundalik hayotingiz yoki ishingiz uchun eng mukammal tanlov.
            </p>
          </div>

          {/* Do'kon kafolatlari (Kichik responsive bloklar) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-y border-slate-100 dark:border-slate-800/80 py-4 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2"><FiTruck size={16} className="text-violet-500 shrink-0" /> <span>Bepul yetkazish</span></div>
            <div className="flex items-center gap-2"><FiShield size={16} className="text-violet-500 shrink-0" /> <span>1 yil rasmiy kafolat</span></div>
            <div className="flex items-center gap-2"><FiRotateCcw size={16} className="text-violet-500 shrink-0" /> <span>14 kun qaytarish</span></div>
          </div>

          {/* Narx va Savatga qo'shish */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Narxi:</span>
              <div className="text-xl md:text-2xl font-black text-violet-600 dark:text-violet-400">${parseFloat(product.price).toFixed(2)}</div>
            </div>
            <button 
              onClick={() => addToCart(product)}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all text-xs w-full sm:w-auto"
            >
              <FiShoppingCart size={15} />
              <span>Savatga qo'shish</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}