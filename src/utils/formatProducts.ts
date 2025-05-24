import { OPTIONS, type Product } from '../stores/productStore';
const isOptionKey = (key: string): key is keyof typeof OPTIONS =>
  key in OPTIONS;

const formatProducts = (products: Product[]) => {
  return products.map((product) => {
    return {
      ...product,
      options: Object.fromEntries(
        Object.entries(product.options).map(([key, val]) => [
          isOptionKey(key) ? OPTIONS[key] : key,
          val,
        ])
      ),
    };
  });
};

export default formatProducts;
