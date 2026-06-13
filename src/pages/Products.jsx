import { useEffect, useState } from 'react';
import useProductStore from '../store/useProductStore';
import { FiShoppingCart, FiSearch, FiSliders, FiEye, FiX, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Products() {
  const { products, loading, fetchProducts, addToCart } = useProductStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [addedItems, setAddedItems] = useState({}); // Tugma holatini o'zgartirish uchun

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Tugma dizaynini vaqtincha o'zgartirish (alert'siz)
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  // Qidiruv va filtrlash mantiqi
  const filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === 'All' || p.category === category)
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  const categories = [
    { id: 'All', label: 'Barchasi' },
    { id: 'Electronics', label: 'Elektronika' },
    { id: 'Jewelery', label: 'Taqinchoqlar' },
    { id: "Men's Clothing", label: 'Erkaklar kiyimi' },
    { id: "Women's Clothing", label: 'Ayollar kiyimi' }
  ];

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 text-xs">
      
      {/* 🌟 1. SAHIFA SARLAVHASI VA STATISTIKA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm transition-colors">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">Mahsulotlar Katalogi</h1>
          <p className="text-xs text-slate-400 mt-0.5">O'zingizga mos eng mukammal texnika va jihozlarni toping</p>
        </div>
        <div className="bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 font-bold px-4 py-2 rounded-2xl shrink-0">
          Mavjud: {filteredProducts.length} ta mahsulot
        </div>
      </div>

      {/* 🔍 2. QIDIRUV VA SARALASH PANELI */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Jonli qidiruv inputi */}
          <div className="relative md:col-span-2">
            <FiSearch className="absolute left-4 top-4 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Nima qidiryapsiz? (masalan: iPhone, MacBook...)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-slate-900 dark:text-white shadow-sm focus:border-violet-500 dark:focus:border-violet-500 transition-all font-medium"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer">
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* Narx filtri */}
          <div>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-slate-900 dark:text-white font-bold shadow-sm cursor-pointer"
            >
              <option value="default">⚡ Saralash: Standart</option>
              <option value="low">📉 Narx: Arzonidan qimmatiga</option>
              <option value="high">📈 Narx: Qimmatidan arzoniga</option>
            </select>
          </div>
        </div>

        {/* 🏷️ KATEGORIYALAR (ZAMONAVIY PILLS DIZAYNI) */}
        <div className="flex flex-wrap gap-2 pt-1 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl font-bold cursor-pointer transition-all active:scale-95 whitespace-nowrap border ${
                category === cat.id
                  ? 'bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-600/10'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 📦 3. MAHSULOTLAR GRIDI */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-12 text-center text-slate-400 font-bold flex flex-col items-center justify-center space-y-2">
          <FiSliders size={32} className="stroke-1 text-slate-300" />
          <p>Hech qanday mahsulot topilmadi.</p>
          <button onClick={() => { setSearch(''); setCategory('All'); setSort('default'); }} className="text-violet-600 font-bold underline mt-1 cursor-pointer">Filtrlarni tozalash</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const isAdded = addedItems[product.id];
            return (
              <div 
                key={product.id} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-1 relative"
              >
                {/* Rasm va uning ustidagi vizual effektlar */}
                <div className="block relative bg-white aspect-square overflow-hidden border-b border-slate-50 dark:border-slate-950">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Tezkor ko'rish tugmasi (Hover bo'lganda chiqadi) */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Link 
                      to={`/products/${product.id}`}
                      className="p-3 bg-white text-slate-900 hover:text-violet-600 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center"
                    >
                      <FiEye size={16} />
                    </Link>
                  </div>

                  {/* Kategoriya nishoni */}
                  <span className="absolute top-3 left-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-200 font-black text-[9px] px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                
                {/* Ma'lumotlar qismi */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4 bg-white dark:bg-slate-900 transition-colors">
                  <div className="space-y-1">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-50 dark:border-slate-800/50">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Narxi</span>
                      <span className="text-sm font-black text-violet-600 dark:text-violet-400">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </div>

                    {/* Qo'shish tugmasi (Dizayni dinamik o'zgaradi, alert yo'q) */}
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className={`flex items-center gap-1.5 font-bold px-3.5 py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all duration-300 ${
                        isAdded 
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' 
                          : 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm'
                      }`}
                    >
                      {isAdded ? <FiCheck size={13} /> : <FiShoppingCart size={13} />}
                      <span>{isAdded ? "Qo'shildi" : "Savatga"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}