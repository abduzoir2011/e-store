import { useState, useEffect } from 'react';
import useProductStore from '../store/useProductStore';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiUploadCloud, FiLock, FiUser, FiLogIn } from 'react-icons/fi';

const initialProducts = [
  { title: "MacBook Pro 16\" M3 Max", price: 2499.99, category: "Electronics", image: "https://i.pinimg.com/736x/cc/38/48/cc3848a2541c91ecb971f757d2db10ba.jpg" },
  { title: "iPhone 15 Pro Max Titanium", price: 1199.00, category: "Electronics", image: "https://i.pinimg.com/736x/e1/94/1d/e1941d72a3485f5d1bcca16a8183b007.jpg" },
  { title: "Sony WH-1000XM5 ANC Headphones", price: 398.00, category: "Electronics", image: "https://i.pinimg.com/736x/77/10/24/77102483f2e1c6fdf0028aa7fc76e05c.jpg" },
  { title: "Apple Watch Ultra 2 Titanium", price: 799.00, category: "Electronics", image: "https://i.pinimg.com/1200x/c3/75/cb/c375cb570e7314fb67be09fb4877b107.jpg" },
  { title: "iPad Pro 12.9\" M2 Liquid Retina", price: 1099.00, category: "Electronics", image: "https://i.pinimg.com/736x/22/dd/ca/22ddca22755b55cf66e51df9d982e29f.jpg" },
  { title: "Samsung Galaxy S24 Ultra", price: 1299.99, category: "Electronics", image: "https://i.pinimg.com/736x/6c/5a/fd/6c5afd0bccfc1e49f75885719e708633.jpg" }
];

export default function Dashboard() {
  const { products, loading, fetchProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isAdminLoggedIn') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [image, setImage] = useState('');
  const [isUploadingAll, setIsUploadingAll] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) fetchProducts();
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '12345') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Login yoki parol noto‘g‘ri!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
  };

  const handleUploadAll = async () => {
    if (products.length > 0) {
      if (!window.confirm("Bazangizda mahsulotlar bor. Yana qo'shishni xohlaysizmi?")) return;
    }
    setIsUploadingAll(true);
    for (let item of initialProducts) await addProduct(item);
    setIsUploadingAll(false);
    fetchProducts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !image) return alert("Barcha maydonlarni to'ldiring!");

    if (editingId) {
      await updateProduct({ id: editingId, title, price: parseFloat(price), category, image });
      setEditingId(null);
    } else {
      await addProduct({ title, price: parseFloat(price), category, image });
    }
    setTitle(''); setPrice(''); setImage('');
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setCategory(product.category);
    setImage(product.image);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-md space-y-6 text-xs">
          <div className="text-center space-y-2">
            <div className="mx-auto w-10 h-10 bg-violet-100 dark:bg-violet-950/40 text-violet-600 rounded-2xl flex items-center justify-center"><FiLock size={18} /></div>
            <h2 className="text-base font-black text-slate-950 dark:text-white">Admin Panelga Kirish</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-400 flex items-center gap-1"><FiUser size={12} /> Login</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white" />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-400 flex items-center gap-1"><FiLock size={12} /> Parol</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="•••••" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white" />
            </div>
            {authError && <p className="text-rose-500 font-bold text-center text-[11px]">{authError}</p>}
            <button type="submit" className="w-full bg-violet-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 text-xs"><FiLogIn size={14} /> Kirish</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4 text-slate-900 dark:text-slate-100">
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black">Dashboard (Admin)</h1>
          <p className="text-xs text-slate-400">Mock API bazasini boshqarish</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleUploadAll}
            disabled={isUploadingAll || loading}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer shadow-sm"
          >
            <FiUploadCloud size={16} />
            {isUploadingAll ? "Yuklanmoqda..." : "Tayyor mahsulotlar"}
          </button>
          <button onClick={handleLogout} className="text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 px-3 py-2.5 rounded-xl cursor-pointer">Chiqish</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold flex items-center gap-2">
            {editingId ? <FiEdit2 className="text-amber-500" /> : <FiPlus className="text-violet-500" />}
            {editingId ? "Tahrirlash" : "Yangi qo'shish"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="space-y-1"><label className="font-bold text-slate-400">Nomlanishi</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white" /></div>
            <div className="space-y-1"><label className="font-bold text-slate-400">Narxi ($)</label><input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white" /></div>
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Kategoriya</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white">
                <option value="Electronics">Electronics</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Men's Clothing">Men's Clothing</option>
                <option value="Women's Clothing">Women's Clothing</option>
              </select>
            </div>
            <div className="space-y-1"><label className="font-bold text-slate-400">Rasm URL</label><input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl outline-none text-slate-900 dark:text-white" /></div>
            <div className="pt-2 flex gap-2">
              <button type="submit" className={`flex-1 p-3 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer ${editingId ? 'bg-amber-500' : 'bg-violet-600'}`}>{editingId ? "Saqlash" : "Qo'shish"}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setTitle(''); setPrice(''); setImage(''); }} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-xl"><FiX size={16} /></button>}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase text-slate-400">Mavjud ro'yxat</h3>
            <span className="text-xs font-bold text-violet-600">Jami: {products.length} ta</span>
          </div>
          <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
            <table className="w-full text-left text-xs min-w-[500px]">
              <thead className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 z-10 text-slate-400 font-bold">
                <tr>
                  <th className="p-4">Rasm</th>
                  <th className="p-4">Mahsulot</th>
                  <th className="p-4">Kategoriya</th>
                  <th className="p-4">Narxi</th>
                  <th className="p-4 text-center">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="p-4"><img src={product.image} alt="" className="w-8 h-8 rounded-lg object-cover" /></td>
                    <td className="p-4 font-bold max-w-[150px] truncate">{product.title}</td>
                    <td className="p-4 text-slate-500">{product.category}</td>
                    <td className="p-4 font-black">${parseFloat(product.price || 0).toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => handleEditClick(product)} className="p-2 text-amber-600 hover:bg-amber-500 hover:text-white rounded-lg cursor-pointer"><FiEdit2 size={13} /></button>
                        <button onClick={() => deleteProduct(product.id)} className="p-2 text-rose-600 hover:bg-rose-500 hover:text-white rounded-lg cursor-pointer"><FiTrash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}