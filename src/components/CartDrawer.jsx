import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import useCartStore from '../store/useCartStore';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCartStore();
  const totalPrice = cart.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 1), 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-120 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity animate-fade-in" onClick={closeCart} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 flex flex-col shadow-2xl animate-slide-left">
          
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2"><FiShoppingBag /> Savatchangiz</h2>
            <button onClick={closeCart} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition"><FiX size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {(!cart || cart.length === 0) ? (
              <div className="h-full flex flex-col justify-center items-center text-center text-slate-400 space-y-4">
                <FiShoppingBag size={48} className="stroke-[1.5]" />
                <p className="text-sm font-medium">Savatchangiz bo'sh.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <img src={item.image} alt="" className="w-16 h-16 object-contain bg-white rounded-xl p-1 border" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</h4>
                    <span className="text-xs font-black text-violet-600 dark:text-violet-400 block mt-1">${item.price}</span>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-white dark:bg-slate-700 border text-slate-600 dark:text-white rounded-md"><FiMinus size={12} /></button>
                      <span className="text-xs font-bold text-slate-800 dark:text-white px-1">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-white dark:bg-slate-700 border text-slate-600 dark:text-white rounded-md"><FiPlus size={12} /></button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-rose-600 p-2 rounded-lg transition"><FiTrash2 size={16} /></button>
                </div>
              ))
            )}
          </div>

          {cart && cart.length > 0 && (
            <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-6 space-y-4 bg-slate-50/50 dark:bg-slate-900">
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white">
                <span>Jami:</span>
                <span className="text-xl font-black text-violet-600 dark:text-violet-400">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full bg-slate-950 dark:bg-violet-600 text-white font-bold py-4 rounded-xl shadow-lg text-center text-sm">Xaridni rasmiylashtirish</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}