import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Pagination } from '@mui/material';
import Loader from '../components/Loader';
import useProducts from '../hooks/useProducts';

const ITEMS_PER_PAGE = 6;
const FIRST_PAGE = 1;

const ProductList = () => {
  const { filteredProducts, loading } = useProducts();

  const [activePage, setActivePage] = useState(FIRST_PAGE);
  const startIdx = (activePage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <>
      {loading && !filteredProducts.length ? (
        <Loader />
      ) : filteredProducts.length ? (
        <div className="p-8 flex flex-col flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-8 items-start justify-center">
            {paginated.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              count={pageCount}
              page={activePage}
              onChange={(_, page) => setActivePage(page)}
              color="primary"
            />
          </div>
        </div>
      ) : (
        <div className="p-8 text-center w-full">No products available.</div>
      )}
    </>
  );
};

export default ProductList;
