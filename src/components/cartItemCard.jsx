import React, { useState, useRef } from "react";
import { useCart } from "../context/CartContext";

const CartItemCard = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const currentVal = parseInt(inputRef.current?.value);
    if (!isNaN(currentVal) && currentVal > 0) {
      updateQuantity(item.id, currentVal);
    } else {
      removeFromCart(item.id, true);
    }
    setIsEditing(false);
  };

  const handleRemove = () => {
    removeFromCart(item.id, true);
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      if (val >= 0) {
        setQuantity(val);
      }
    } else {
      setQuantity(0);
    }
  };

  return (
    <div className="card shadow h-100 p-3">
      <div className="row g-0 align-items-center">
        {/* Board Game Icon */}
        <div className="col-4 text-center">
          <span className="display-1">🎲</span>
        </div>

        {/* Purchase Details */}
        <div className="col-8">
          <div className="card-body d-flex flex-column text-end">
            <h5 className="card-title fw-bold mb-2">{item.name}</h5>

            <div className="d-flex justify-content-end align-items-center mb-2">
              {isEditing ? (
                <>
                  {/* Decrement Quantity */}
                  <button
                    className="btn btn-link p-0 px-2 text-decoration-none text-muted"
                    style={{
                      fontSize: "1.5rem",
                      lineHeight: "1rem",
                      transition: "color 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5b8fd1")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    onClick={decrement}
                  >
                    ❮
                  </button>

                  {/* Quantity Input */}
                  <input
                    ref={inputRef}
                    type="number"
                    inputMode="numeric"
                    className="form-control text-center mx-2"
                    style={{
                      width: "50px",
                      display: "inline-block",
                      MozAppearance: "textfield",
                    }}
                    value={quantity}
                    onChange={handleInputChange}
                    onWheel={(e) => e.preventDefault()}
                    onFocus={(e) => (e.target.style.appearance = "textfield")}
                  />
                  <style>
                    {`
                      input[type=number]::-webkit-inner-spin-button,
                      input[type=number]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                      }
                    `}
                  </style>

                  {/* Increment Quantity */}
                  <button
                    className="btn btn-link p-0 px-2 text-decoration-none text-muted"
                    style={{
                      fontSize: "1.5rem",
                      lineHeight: "1rem",
                      transition: "color 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5b8fd1")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    onClick={increment}
                  >
                    ❯
                  </button>

                  {/* Save Button */}
                  <button
                    className="btn btn-link p-0 ms-3 text-decoration-underline text-muted"
                    style={{ transition: "color 0.2s ease-in-out" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5b8fd1")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-0 me-2 text-muted">
                    {quantity} @ ${item.price} ea.
                  </p>
                  <button
                    className="btn btn-link p-0 text-decoration-underline text-muted"
                    style={{ transition: "color 0.2s ease-in-out" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5b8fd1")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>

            {/* Total and Remove */}
            <p className="mb-2">Total: ${(quantity * item.price).toFixed(2)}</p>
            <button
              className="btn btn-link p-0 text-decoration-underline text-muted align-self-end"
              style={{ transition: "color 0.2s ease-in-out" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c66")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
