import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://69e0aa9129c070e6597bd8d6.mockapi.io/products'; 

const useProductStore = create((set, get) => ({
  products: [],
  cart: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    if (get().loading) return; 
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ products: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
    // ALERT OLIB TASHLANDI!
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => set({ cart: [] }),

  addProduct: async (newProduct) => {
    try {
      const response = await axios.post(API_URL, newProduct);
      set((state) => ({ products: [response.data, ...state.products] }));
    } catch (err) {
      console.error(err);
    }
  },

  updateProduct: async (updatedProduct) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
      set((state) => ({
        products: state.products.map((p) => p.id === updatedProduct.id ? response.data : p)
      }));
    } catch (err) {
      console.error(err);
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
    } catch (err) {
      console.error(err);
    }
  }
}));

export default useProductStore;