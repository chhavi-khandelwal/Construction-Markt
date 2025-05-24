import type { Product } from '../stores/productStore';

export const fetchProducts = async (): Promise<Product[]> => {
  let products = null;
  try {
    // const productsResponse = await fetch(`${import.meta.env.VITE_API}/api/products`);
    const productsResponse = await fetch(`/product-catalog.json`);
    products = await productsResponse.json();
  } catch (e) {
    alert(e);
  }
  return products;
};
