import { useEffect, useState } from 'react';
import useProductStore from '../store/useProductStore';
import { FiShoppingCart, FiSearch, FiSliders } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Products() {
  const { products, loading, fetchProducts, addToCart } = useProductStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    fetchProducts();
  }, []);

  // Qidiruv va filtrlash mantiqi
  const filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === 'All' || p.category === category)
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-2">
      {/* SARLAVHA */}
      <div>
        <h1 className="text-xl md:text-2xl font-black">Mahsulotlar Katalogi</h1>
        <p className="text-xs text-slate-400">Eng so'nggi va premium texnikalar dunyosi</p>
      </div>

      {/* 🔍 FILTRLAR PANELI (Mobilda 1 ustun, Desktopda yonma-yon) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors text-xs">
        
        {/* Qidiruv input */}
        <div className="relative col-span-1 sm:col-span-2 lg:col-span-2">
          <FiSearch className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Mahsulot qidirish..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white"
          />
        </div>

        {/* Kategoriya filtri */}
        <div className="w-full">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white font-bold"
          >
            <option value="All">Barcha kategoriyalar</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewelery">Jewelery</option>
            <option value="Men's Clothing">Men's Clothing</option>
            <option value="Women's Clothing">Women's Clothing</option>
          </select>
        </div>

        {/* Narx bo'yicha saralash */}
        <div className="w-full">
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white font-bold"
          >
            <option value="default">Saralash (Standart)</option>
            <option value="low">Narx: Arzonidan qimmatiga</option>
            <option value="high">Narx: Qimmatidan arzoniga</option>
          </select>
        </div>
      </div>

      {/* 📦 MAHSULOTLAR GRIDI (Mobilda 1 ta, Planshetda 2-3 ta, Kompyuterda 4 ta ustun) */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-slate-400 font-bold text-xs">Mahsulot topilmadi...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group transition-all hover:shadow-md hover:-translate-y-0.5 text-xs"
            >
              <Link to={`/products/${product.id}`} className="block relative bg-white aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </Link>
              
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{product.category}</span>
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-2 mt-0.5 hover:text-violet-600 transition-colors">{product.title}</h3>
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-black text-violet-600 dark:text-violet-400">${parseFloat(product.price).toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1 bg-violet-600 hover:bg-violet-700 text-white font-bold px-3 py-2 rounded-xl cursor-pointer active:scale-95 transition-all"
                  >
                    <FiShoppingCart size={13} />
                    <span>Qo'shish</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}