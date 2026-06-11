import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthModalOpen: false,

      openAuthModal: () => set({ isAuthModalOpen: true }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
      
      login: (userData) => set({ user: userData, isAuthModalOpen: false }),
      logout: () => set({ user: null })
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthStore;