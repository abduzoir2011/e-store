import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; 
import Home from './pages/Home'; 
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import useProductStore from './store/useProductStore'; 
import { FiShoppingCart, FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

export default function App() {
  const { cart, removeFromCart, addToCart } = useProductStore();
  const [isCartOpen, setIsCartOpen] = useState(false); 

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      useProductStore.setState({
        cart: cart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity - 1 } : c)
      });
    } else {
      removeFromCart(item.id);
    }
  };

  return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased flex flex-col justify-between transition-colors duration-300">
        
        <div>
          <Navbar onCartOpen={() => setIsCartOpen(true)} />

          <main className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>

        <Footer />

        {/* 🛒 SAVAT DRAWER (MOBIL VA DESKTOPGA MOSLASHGAN) */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
            <div className="relative w-full max-w-sm sm:max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-10 border-l border-slate-100 dark:border-slate-800 transition-colors duration-300">
              
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiShoppingCart className="text-violet-600 dark:text-violet-400" size={18} />
                  <h2 className="text-sm font-black text-slate-950 dark:text-white">Sizning Savatingiz</h2>
                  <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">{totalItems} ta</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500 cursor-pointer"><FiX size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-slate-400 dark:text-slate-600">
                    <FiShoppingCart size={40} className="stroke-1" />
                    <p className="text-xs font-bold">Savatingiz hozircha bo'sh</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-900/60 text-xs">
                      <img src={item.image} alt="" className="w-16 h-16 rounded-xl object-cover bg-white" />
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.title}</h4>
                          <p className="text-[11px] text-violet-600 dark:text-violet-400 font-black mt-0.5">${parseFloat(item.price).toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg px-2 py-1">
                            <button onClick={() => handleDecrease(item)} className="cursor-pointer text-slate-500 hover:text-violet-500"><FiMinus size={10} /></button>
                            <span className="font-bold text-[11px] px-1 text-slate-900 dark:text-white">{item.quantity}</span>
                            <button onClick={() => addToCart(item)} className="cursor-pointer text-slate-500 hover:text-violet-500"><FiPlus size={10} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-rose-500 cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/30 p-1.5 rounded-lg"><FiTrash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-4 text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-400 dark:text-slate-500">Umumiy summa:</span>
                    <span className="text-base font-black text-violet-600 dark:text-violet-400">${totalPrice.toFixed(2)}</span>
                  </div>
                  <button onClick={() => alert("Buyurtmangiz qabul qilindi!")} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl cursor-pointer shadow-sm active:scale-95 transition-all">Buyurtmani rasmiylashtirish</button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
  );
}