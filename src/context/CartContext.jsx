import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const API_BASE_URL = "https://818i0hreog.execute-api.us-east-2.amazonaws.com/dev";

const CartProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState(new Map());
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotalCost, setCartTotalCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(10.99);

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/inventory-management/inventory`);
        if (!response.ok) throw new Error(`Failed to fetch catalog: ${response.status}`);
        const data = await response.json();

        const normalized = data.map((p) => ({
          id: p.id || p.ID,
          name: p.name || p.NAME || "Unnamed Product",
          description: p.description || p.DESCRIPTION || "No description available.",
          price: p.price || p.UNIT_PRICE || 0,
          available_quantity:
            p.available_quantity || p.AVAILABLE_QUANTITY || p.quantity || 0,
          players: p.players || p.PLAYERS || "N/A",
          time: p.time || p.TIME || "Unknown",
          age: p.age || p.AGE || "All ages",
        }));

        setCatalog(normalized);
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
      message: "Added to cart!",
      productName,
    };

    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToCart = (id) => {
    const product = catalog.find((p) => p.id === id);
    if (!product) return;

    setCart((prev) => {
      const newCart = new Map(prev);
      const currentQty = newCart.get(id) || 0;

      if (product.available_quantity && currentQty >= product.available_quantity) {
        alert(`Only ${product.available_quantity} units of ${product.name} are available.`);
        return prev;
      }

      newCart.set(id, currentQty + 1);
      return newCart;
    });

    setCartQuantity((prev) => prev + 1);
    setCartTotalCost((prev) => prev + Number(product.price || 0));
    showToast(product.name);
  };

  const removeFromCart = (id, removeAll = false) => {
    const product = catalog.find((p) => p.id === id);
    if (!product) return;

    setCart((prev) => {
      const newCart = new Map(prev);
      const currentQty = newCart.get(id) || 0;
      if (currentQty === 0) return prev;

      if (removeAll || currentQty === 1) {
        newCart.delete(id);
      } else {
        newCart.set(id, currentQty - 1);
      }
      return newCart;
    });

    const price = Number(product.price || 0);
    setCartQuantity((prev) => (removeAll ? prev - (cart.get(id) || 1) : prev - 1));
    setCartTotalCost((prev) =>
      removeAll ? prev - price * (cart.get(id) || 1) : prev - price
    );
  };

  const updateQuantity = (id, newQty) => {
    const product = catalog.find((p) => p.id === id);
    if (!product) return;

    setCart((prev) => {
      const newCart = new Map(prev);
      if (newQty <= 0) newCart.delete(id);
      else newCart.set(id, newQty);

      let totalQty = 0;
      let totalCost = 0;
      for (const [pid, qty] of newCart.entries()) {
        const item = catalog.find((p) => p.id === pid);
        if (item) {
          totalQty += qty;
          totalCost += qty * Number(item.price || 0);
        }
      }

      setCartQuantity(totalQty);
      setCartTotalCost(totalCost);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart(new Map());
    setCartQuantity(0);
    setCartTotalCost(0);
  };

  const getCartItems = () =>
    Array.from(cart.entries()).map(([id, qty]) => {
      const item = catalog.find((p) => p.id === id);
      return item
        ? { ...item, quantity: qty }
        : { id, name: "Unknown Item", price: 0, quantity: qty };
    });

  return (
    <CartContext.Provider
      value={{
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
        error,
      }}
    >
      {children}

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "350px",
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={{ animation: "slideInFromBottom 0.3s ease-out" }}>
            <div
              className="alert alert-success alert-dismissible fade show shadow-lg mb-0"
              role="alert"
            >
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
