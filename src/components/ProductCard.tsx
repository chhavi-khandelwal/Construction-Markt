import { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  FormHelperText,
  IconButton,
} from '@mui/material';
import type { Product } from '../stores/productStore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useProductValidation } from '../hooks/useProductValidation';

interface Props {
  product: Product;
}

const MIN_QUANTITY = 1;

const ProductCard = ({ product }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [options, setOptions] = useState<Record<string, string>>({});
  const { items: cartItems, addToCart, setOpen } = useCartStore();
  const { errors, validate, resetError } = useProductValidation(
    product,
    cartItems
  );

  const handleAddToCart = () => {
    if (validate(options, quantity)) {
      return;
    }

    addToCart({
      id: product.id,
      uid: Date.now().toString(),
      name: product.name,
      category: product.category,
      quantity,
      options,
    });

    resetValues();
  };

  const resetValues = () => {
    setExpanded(false);
    setOpen(true);
    setOptions({});
    setQuantity(MIN_QUANTITY);
  };

  return (
    <Card
      role="region"
      aria-label={`Product: ${product.name}`}
      className={`relative border border-slate-200 shadow-none! rounded-2xl! cursor-pointer w-[300px] flex flex-col`}
    >
      <div
        className={`flex items-start gap-2 justify-between p-4 ${expanded ? 'border-b border-b-slate-200' : ''}`}
        title={product.name}
        onClick={() => setExpanded((prev) => !prev)}
        aria-description={product.name}
      >
        <h6 className="text-base font-bold truncate text-gray-700 hover:text-gray-950">
          {product.name}
        </h6>
        <IconButton
          aria-label={expanded ? 'Expanded' : 'Collapsed'}
          className="p-0! text-gray-700! hover:text-gray-950!"
        >
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      {expanded && (
        <CardContent className="w-full h-[320px] flex flex-col p-4 gap-2 justify-between">
          <div className="flex flex-col">
            <span className="text-xs">Description: {product.name}</span>
            <span className="text-xs">Category: {product.category}</span>
          </div>

          <div className="flex flex-col overflow-x-auto gap-2 scroll-y pt-2">
            {Object.entries(product.options).map(([key, values]) => (
              <FormControl
                key={key}
                fullWidth
                size="small"
                error={!!errors[key]}
              >
                <InputLabel>{key}</InputLabel>
                <Select
                  label={key}
                  value={options[key] || ''}
                  onChange={(e) => {
                    setOptions((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }));
                    resetError(key);
                  }}
                  size="small"
                >
                  {values.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors[key]}</FormHelperText>
              </FormControl>
            ))}
            <TextField
              fullWidth
              label="Quantity(in tons)"
              type="number"
              size="small"
              inputProps={{ min: 1 }}
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
                resetError('quantity');
              }}
              error={!!errors.quantity}
              helperText={errors.quantity ? 'quantity >= 1' : ''}
            />
          </div>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            size="small"
            aria-label="add to cart"
          >
            Add to Cart
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default ProductCard;
