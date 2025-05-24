import { IconButton } from '@mui/material';
import NotificationService from '../services/NotificationService';
import { useCartStore } from '../stores/cartStore';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const { items, clearCart, open, setOpen, removeItem } = useCartStore();

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-51
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
      role="dialog"
      arial-label="cart-1"
    >
      <div className="flex justify-between items-center border-b border-slate-200 px-4 py-2">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={() => setOpen(false)} aria-label="Close cart">
          ✕
        </button>
      </div>
      <div className="p-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-700 text-center">
            Add to cart to place order.
          </p>
        ) : (
          <ul>
            {items.map((item) => {
              return (
                <li
                  key={item.uid}
                  className="border-b py-2"
                  aria-label="cart-item"
                >
                  <div className="flex flex-wrap gap-2 justify-between">
                    <div className="font-medium">{item.name}</div>
                    <IconButton
                      aria-label="Remove from cart"
                      onClick={() => removeItem(item.uid)}
                      className="p-0! text-gray-700! hover:text-gray-950!"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="text-sm text-gray-700">
                      Qty(in tons): {item.quantity}
                    </div>
                    {item.options &&
                      Object.entries(item.options).map(([name, value]) => (
                        <div className="text-sm text-gray-700" key={name}>
                          {name}: {value}
                        </div>
                      ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {items.length > 0 && (
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
            onClick={() => {
              clearCart();
              setOpen(false);
              NotificationService.show('Order placed successfully!', 'success');
            }}
            aria-label="Place order"
          >
            Place Order
          </button>
        )}
      </div>
    </aside>
  );
};

export default Cart;
