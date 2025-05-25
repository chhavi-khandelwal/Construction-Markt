import { create } from 'zustand';

export const OPTIONS = {
  lengthsAvailable: 'Length',
  gradesAvailable: 'Grades',
  grainSize: 'Grain size',
  additives: 'Additives',
  source: 'Source',
} as const;

export const ProductCategory = {
  CONCRETE: 'concrete',
  LUMBER: 'lumber',
  SAND: 'sand',
} as const;

type ProductCategoryType = 'concrete' | 'lumber' | 'sand';

export interface Product {
  id: string;
  name: string;
  category: ProductCategoryType;
  options: Record<string, (string | number)[]>;
}

interface ProductState {
  products: Product[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  query: string;
  setQuery: (q: string) => void;
  filteredProducts: Product[];
  filterProducts: (products?: Product[]) => void;
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  query: '',
  setQuery: (q) => set({ query: q }),
  setProducts: (products: Product[]) => set({ products }),
  selectedCategories: [],
  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),
  filteredProducts: [],
  filterProducts: (newProducts?: Product[]) =>
    set((state) => {
      const { selectedCategories: categories, query, products } = state;
      if (newProducts?.length) {
        return { filteredProducts: newProducts };
      }
      if (!categories.length && !query) {
        return { filteredProducts: products };
      }

      //AND logic
      return {
        filteredProducts: state.products.filter((product) => {
          return (
            (categories.length === 0 ||
              categories.includes(product.category)) &&
            (product.name.toLowerCase().includes(query) ||
              product.category.toLowerCase().includes(query))
          );
        }),
      };
    }),
}));
