import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const API_BASE_URL = "https://3tuppmi6x6.execute-api.us-east-2.amazonaws.com/dev";

const CartProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [cart, setCart] = useState(new Map());
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotalCost, setCartTotalCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(10.99);
  
  const [toasts, setToasts] = useState([]);

  // Fetch catalog from API on mount
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/inventory-management/inventory`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch catalog: ${response.status}`);
        }
        
        const data = await response.json();
        setCatalog(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching catalog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

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
    <CartContext.Provider value={{ 
      catalog, 
      cart, 
      cartQuantity, 
      cartTotalCost,
      shippingCost, 
      setShippingCost, 
      addToCart, 
      removeFromCart, 
      getCartItems, 
      updateQuantity,
      clearCart,
      loading,
      error
    }}>
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