import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [catalog] = useState([
        {
            id: 1,
            name: "Strategy Master",
            price: 9.99,
            description: "Perfect for strategic thinkers! Build your empire and outwit your opponents.",
            players: "2-4 players",
            time: "60-90 min",
            age: "12+"
        },
        {
            id: 2,
            name: "Family Fun Night",
            price: 14.99,
            description: "Easy to learn, fun for all ages. The perfect game for family gatherings.",
            players: "3-6 players",
            time: "30-45 min",
            age: "8+"
        },
        {
            id: 3,
            name: "Quick Draw Deluxe",
            price: 19.99,
            description: "Fast-paced drawing and guessing game. Creativity meets competition!",
            players: "4-8 players",
            time: "20-30 min",
            age: "10+"
        },
        {
            id: 4,
            name: "Mystery Manor",
            price: 24.99,
            description: "Solve the mystery before time runs out. Clues, suspects, and surprises!",
            players: "2-6 players",
            time: "45-60 min",
            age: "14+"
        },
        {
            id: 5,
            name: "Adventure Quest",
            price: 29.99,
            description: "Epic cooperative adventure. Work together to save the kingdom!",
            players: "1-5 players",
            time: "90-120 min",
            age: "12+"
        }
    ]);

  const [cart, setCart] = useState(new Map());

  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotalCost, setCartTotalCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(10.99);

  const addToCart = (id) => {
    setCart(prev => {
      const newCart = new Map(prev);
      newCart.set(id, (newCart.get(id) || 0) + 1);
      return newCart;
    });
    setCartQuantity(cartQuantity + 1);
    setCartTotalCost(cartTotalCost + catalog.find(p => p.id === id).price);
  };

  const removeFromCart = (id, removeAll) => {
  let qty = cart.get(id) || 0;
  const price = catalog.find(p => p.id === id)?.price || 0;

  setCart(prev => {
    const newCart = new Map(prev);
    if (!newCart.has(id)) return newCart;

    if (qty > 1 && !removeAll) {
      newCart.set(id, qty - 1);
    } else {
      newCart.delete(id);
    }

    return newCart;
  });

  if (removeAll) {
    setCartQuantity(cartQuantity - qty);
    setCartTotalCost(cartTotalCost - price * qty);
  } else {
    setCartQuantity(cartQuantity - 1);
    setCartTotalCost(cartTotalCost - price);
  }
};


  const updateQuantity = (id, newQty) => {
  setCart(prev => {
    const newCart = new Map(prev);

    if (newQty <= 0) {
      newCart.delete(id);
    } else {
      newCart.set(id, newQty);
    }

    let newTotalQty = 0;
    let newTotalCost = 0;

    for (const [pid, qty] of newCart.entries()) {
      const product = catalog.find(p => p.id === pid);
      if (product) {
        newTotalQty += qty;
        newTotalCost += product.price * qty;
      }
    }

    setCartQuantity(newTotalQty);
    setCartTotalCost(newTotalCost);

    return newCart;
  });
};


  const getCartItems = () =>
    Array.from(cart.entries()).map(([id, qty]) => ({
      ...catalog.find(p => p.id === id),
      quantity: qty
    }));

  return (
    <CartContext.Provider value={{ catalog, cart, cartQuantity, cartTotalCost,
                                    shippingCost, setShippingCost, addToCart, 
                                    removeFromCart, getCartItems, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);

export default CartProvider;
