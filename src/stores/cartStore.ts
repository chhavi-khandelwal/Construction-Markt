import { create } from 'zustand';

interface ProductOption {
  [key: string]: string;
}

export interface CartItem {
  id: string;
  uid: string;
  name: string;
  category: string;
  options: ProductOption;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  open: boolean;
  addToCart: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  open: false,
  addToCart: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (uid) =>
    set((state) => ({ items: state.items.filter((item) => item.uid !== uid) })),
  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ open: !state.open })),
  setOpen: (open: boolean) => set(() => ({ open: open })),
}));
