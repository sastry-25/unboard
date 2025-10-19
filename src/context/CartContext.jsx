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
  
  const [toasts, setToasts] = useState([]);

  const showToast = (productName) => {
    const newToast = {
      id: Date.now(),
      message: 'Added to cart!',
      productName
    };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== newToast.id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const addToCart = (id) => {
    const product = catalog.find(p => p.id === id);
    
    setCart(prev => {
      const newCart = new Map(prev);
      newCart.set(id, (newCart.get(id) || 0) + 1);
      return newCart;
    });
    setCartQuantity(cartQuantity + 1);
    setCartTotalCost(cartTotalCost + product.price);
    
    showToast(product.name);
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

  const clearCart = () => {
    setCart(new Map());
    setCartQuantity(0);
    setCartTotalCost(0);
  }

  const getCartItems = () =>
    Array.from(cart.entries()).map(([id, qty]) => ({
      ...catalog.find(p => p.id === id),
      quantity: qty
    }));

  return (
    <CartContext.Provider value={{ catalog, cart, cartQuantity, cartTotalCost,
                                    shippingCost, setShippingCost, addToCart, 
                                    removeFromCart, getCartItems, updateQuantity,
                                    clearCart }}>
      {children}
      
      {/* Toast Notifications Container */}
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '350px'
        }}
      >
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            style={{
              animation: 'slideInFromBottom 0.3s ease-out'
            }}
          >
            <div className="alert alert-success alert-dismissible fade show shadow-lg mb-0" role="alert">
              <strong>✓ {toast.message}</strong>
              <div className="mt-1">{toast.productName}</div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => removeToast(toast.id)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes slideInFromBottom {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;