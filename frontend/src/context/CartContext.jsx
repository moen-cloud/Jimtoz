import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("jimtoz_cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("jimtoz_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product === product._id);
      if (existing) {
        return prev.map((i) =>
          i.product === product._id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        { product: product._id, name: product.name, price: product.price, quantity },
      ];
    });
    toast.success(`${product.name} added to your basket`);
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.product !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeItem(productId);
    setItems((prev) =>
      prev.map((i) => (i.product === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalPrice, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
