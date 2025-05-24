import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TextField, IconButton } from '@mui/material';
import { useCartStore } from '../stores/cartStore';
import { useEffect } from 'react';
import { useProductStore } from '../stores/productStore';

const Header = () => {
  const { toggleCart } = useCartStore();
  const { filterProducts, query, setQuery } = useProductStore();

  useEffect(() => {
    filterProducts();
  }, [query]);

  return (
    <header className="sticky top-0 z-50  border-b border-slate-200 bg-white py-4 px-6 flex justify-between gap-4 items-center">
      <div className="logo"></div>
      <TextField
        placeholder="Search products..."
        variant="outlined"
        size="medium"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md mx-auto"
        aria-label="Search products"
      />
      <IconButton aria-label="Open cart" onClick={toggleCart} className="p-0!">
        <ShoppingCartIcon />
      </IconButton>
    </header>
  );
};

export default Header;
