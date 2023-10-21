import { create } from 'zustand';

interface CartState {
  cart: any[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
}));
