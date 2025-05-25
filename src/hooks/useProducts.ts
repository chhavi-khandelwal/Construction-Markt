import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';
import formatProducts from '../utils/formatProducts';
import { useProductStore } from '../stores/productStore';

const useProducts = () => {
  const [loading, setLoading] = useState(true);
  const { filteredProducts, setProducts, filterProducts } = useProductStore();

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        const products = formatProducts(data);
        setProducts(products);
        filterProducts(products);
      })
      .catch(() => setLoading(false))
      .finally(() => setLoading(false));
  }, []);

  return { filteredProducts, loading };
};

export default useProducts;
