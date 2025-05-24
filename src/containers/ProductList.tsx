import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Pagination } from '@mui/material';
import { useProductStore } from '../stores/productStore';
import formatProducts from '../utils/formatProducts';
import { fetchProducts } from '../api/api';
import Loader from '../components/Loader';

const ITEMS_PER_PAGE = 6;

const ProductList = () => {
  const {
    filtered: filteredProducts,
    setProducts,
    filterProducts,
  } = useProductStore();

  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);

  const startIdx = (activePage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

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

  return (
    <>
      {loading && !filteredProducts.length ? (
        <Loader />
      ) : filteredProducts.length ? (
        <div className="p-8 flex flex-col flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-8 items-start justify-center md:justify-start">
            {paginated.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination
              count={pageCount}
              page={activePage}
              onChange={(_, page) => setActivePage(page)}
              color="primary"
            />
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">No products available.</div>
      )}
    </>
  );
};

export default ProductList;
