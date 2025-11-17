import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [orderItems, setOrderItems] = useState([]);

  const addToCart = (item) => {
    setOrderItems((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + item.qty } : x
        );
      }
      return [...prev, item];
    });
  };

  const updateQty = (id, qty) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: qty < 1 ? 1 : qty } : item
      )
    );
  };

  const removeItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setOrderItems([]);
  };

  return (
    <CartContext.Provider
      value={{ orderItems, addToCart, updateQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
