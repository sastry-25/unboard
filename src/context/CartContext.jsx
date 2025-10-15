import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [catalog] = useState([
        {
            id: 1,
            name: "Strategy Master",
            price: 10,
            description: "Perfect for strategic thinkers! Build your empire and outwit your opponents.",
            players: "2-4 players",
            time: "60-90 min",
            age: "12+"
        },
        {
            id: 2,
            name: "Family Fun Night",
            price: 15,
            description: "Easy to learn, fun for all ages. The perfect game for family gatherings.",
            players: "3-6 players",
            time: "30-45 min",
            age: "8+"
        },
        {
            id: 3,
            name: "Quick Draw Deluxe",
            price: 20,
            description: "Fast-paced drawing and guessing game. Creativity meets competition!",
            players: "4-8 players",
            time: "20-30 min",
            age: "10+"
        },
        {
            id: 4,
            name: "Mystery Manor",
            price: 25,
            description: "Solve the mystery before time runs out. Clues, suspects, and surprises!",
            players: "2-6 players",
            time: "45-60 min",
            age: "14+"
        },
        {
            id: 5,
            name: "Adventure Quest",
            price: 30,
            description: "Epic cooperative adventure. Work together to save the kingdom!",
            players: "1-5 players",
            time: "90-120 min",
            age: "12+"
        }
    ]);

  const [cart, setCart] = useState(new Map());

  const [cartQuantity, setCartQuantity] = useState(0);

  const addToCart = (id) => {
    setCart(prev => {
      const newCart = new Map(prev);
      newCart.set(id, (newCart.get(id) || 0) + 1);
      return newCart;
    });
    setCartQuantity(cartQuantity + 1);
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newCart = new Map(prev);
      if (!newCart.has(id)) return newCart;
      const qty = newCart.get(id);
      qty > 1 ? newCart.set(id, qty - 1) : newCart.delete(id);
      return newCart;
    });
    setCartQuantity(cartQuantity - 1);
  };

  const getCartItems = () =>
    Array.from(cart.entries()).map(([id, qty]) => ({
      ...catalog.find(p => p.id === id),
      quantity: qty
    }));

  return (
    <CartContext.Provider value={{ catalog, cart, cartQuantity, addToCart, removeFromCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);

export default CartProvider;
