import { useState, useCallback } from 'react';
import { ProductCategory, type Product } from '../stores/productStore';
import { type CartItem } from '../stores/cartStore';
import NotificationService from '../services/NotificationService';

export const useProductValidation = (
  product: Product,
  cartItems: CartItem[]
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<string | undefined>();

  const validate = useCallback(
    (options: Record<string, string>, quantity: number) => {
      const errors: Record<string, string> = {};
      let notify: string | undefined;

      if (!quantity || quantity < 1) {
        errors.quantity = 'Must be >= 1';
      }

      Object.keys(product.options).forEach((key) => {
        if (!options[key]) {
          errors[key] = 'Required';
        }
      });

      if (product.category === ProductCategory.CONCRETE) {
        const total =
          cartItems
            .filter((item) => item.category === ProductCategory.CONCRETE)
            .reduce((sum, item) => sum + item.quantity, 0) + quantity;
        if (total > 1000) {
          notify = 'Total concrete weight must not exceed 1000 tons.';
          NotificationService.show(notify, 'error');
        }
      }

      setErrors(errors);
      setNotification(notify);

      return Object.keys(errors).length > 0 || !!notify;
    },
    [product, cartItems]
  );

  const resetError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    notification,
    validate,
    resetError,
  };
};
