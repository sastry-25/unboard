import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  "https://818i0hreog.execute-api.us-east-2.amazonaws.com/dev";

const OrderReview = () => {
  const navigate = useNavigate();
  const { getCartItems, cartTotalCost, clearCart } = useCart();
  const {
    shippingDetails,
    paymentDetails,
    salesTax,
    shippingCost,
    clearOrderDetails,
  } = useOrder();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorHtml, setErrorHtml] = useState(null);

  const calculatedTax = (cartTotalCost + shippingCost) * salesTax;
  const orderTotal = cartTotalCost + shippingCost + calculatedTax;

  const maskCardNumber = (number) => {
    if (!number) return "";
    const cleaned = String(number).replace(/\s/g, "");
    if (cleaned.length < 16) return "Invalid Number";
    return "**** **** **** " + cleaned.slice(12);
  };

  const buildInsufficientStockBanner = (result) => {
    let items = Array.isArray(result.items) ? result.items.slice() : [];

    if (!items.length && result.message?.toLowerCase().includes("not in stock")) {
      const available = Number.isFinite(result.availableQuantity)
        ? result.availableQuantity
        : 0;
      const cartItems = getCartItems();
      const idMatch = result.message.match(/item\s+(\d+)/i);
      let failing = null;

      if (idMatch) {
        const failedId = parseInt(idMatch[1], 10);
        failing =
          cartItems.find((ci) => Number(ci.id) === failedId) || null;
      }
      if (!failing) {
        failing =
          cartItems.find((ci) => ci.quantity > available) || cartItems[0];
      }

      if (failing) {
        items = [
          {
            itemId: failing.id,
            itemName: failing.name || `Item ${failing.id}`,
            requested: failing.quantity,
            available: available,
          },
        ];
      }
    }

    const listHTML = items
      .map((i) => {
        const req = Number(i.requested) || 0;
        const avail = Number(i.available) || 0;
        const toRemove = Math.max(req - avail, 0);
        const name = i.itemName || `Item ${i.itemId ?? ""}`.trim();
        return `<div><strong>${name}</strong> — requested ${req}, only ${avail} available <span>(remove ${toRemove})</span></div>`;
      })
      .join("");

    const fullMsg = `
      <p><strong>1 or more items ordered do not have enough quantity in stock.</strong></p>
      ${listHTML}
      <p class="mt-2">Please remove or adjust these items before checking out again.</p>
      <button class="btn btn-outline-light btn-sm mt-2" id="returnToCart">Return to Cart</button>
    `;

    setErrorHtml(fullMsg);

    setTimeout(() => {
      const btn = document.getElementById("returnToCart");
      if (btn) btn.onclick = () => navigate("/cart");
    }, 0);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setErrorHtml(null);

    try {
      const orderData = {
        items: getCartItems().map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        shipping: {
          address1: shippingDetails.address1,
          address2: shippingDetails.address2,
          city: shippingDetails.city,
          state: shippingDetails.state,
          country: "USA",
          postalCode: shippingDetails.postalCode,
          email: "",
        },
        payment: {
          cardHolder: paymentDetails.cardHolder,
          cardNumber: paymentDetails.cardNumber,
          expirationDate: paymentDetails.expirationDate,
          cvv: paymentDetails.cvv || "",
        },
        customerName: paymentDetails.cardHolder,
        customerEmail: "",
      };

      const response = await fetch(
        `${API_BASE_URL}/order-processing/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const rawResult = await response.json();
      const result =
        typeof rawResult.body === "string"
          ? JSON.parse(rawResult.body)
          : rawResult;

      if (rawResult.statusCode && rawResult.statusCode >= 400) {
        if (
          result.message?.toLowerCase().includes("insufficient stock") ||
          result.message?.toLowerCase().includes("not in stock")
        ) {
          buildInsufficientStockBanner(result);
          return;
        }

        if (result.message?.toLowerCase().includes("not found")) {
          setErrorHtml(
            `<p>One or more items in your cart could not be found in inventory.</p>
             <p>Please refresh your cart before trying again.</p>`
          );
          return;
        }

        setErrorHtml(
          `<p>${
            result.message ||
            "We were unable to process your order. Please try again."
          }</p>`
        );
        return;
      }

      if (!result.confirmationNumber) {
        setErrorHtml(
          `<p>Order succeeded but no confirmation number was returned.</p>`
        );
        return;
      }

      clearCart();
      clearOrderDetails();

      navigate("/order/viewConfirmation", {
        state: {
          confirmationNumber: result.confirmationNumber,
          orderDetails: result,
          orderTotal: result.orderTotal,
        },
      });
    } catch (err) {
      console.error("Error placing order:", err);
      setErrorHtml(
        `<p>A network or server error occurred. Please try again.</p>`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <div className="bg-primary text-white py-4">
          <div className="container text-center">
            <h1 className="display-5 fw-bold">Order Review</h1>
            <p className="lead">
              Confirm your order details before submission
            </p>
          </div>
        </div>

        <div className="container my-5">
          {errorHtml && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
              dangerouslySetInnerHTML={{ __html: errorHtml }}
            />
          )}

          <div className="row justify-content-center align-items-start g-5">
            <div className="col-md-7">
              <div className="card shadow-sm mb-5 p-4">
                <h4 className="fw-bold mb-3">🛒 Cart Summary</h4>
                {getCartItems().length === 0 ? (
                  <p className="text-muted">Your cart is empty.</p>
                ) : (
                  <ul className="list-group list-group-flush">
                    {getCartItems().map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div
                          className="text-start"
                          style={{ minWidth: "70%", wordBreak: "break-word" }}
                        >
                          <strong>{item.name}</strong>
                          <br />
                          <span className="text-muted">
                            Quantity: {item.quantity}
                          </span>
                        </div>
                        <span
                          className="fw-semibold text-end"
                          style={{
                            minWidth: "25%",
                            textAlign: "right",
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="card shadow-sm mb-5 p-4">
                <h4 className="fw-bold mb-3">📦 Shipping Details</h4>
                {shippingDetails && shippingDetails.address1 ? (
                  <div>
                    <p className="mb-1">{shippingDetails.address1}</p>
                    {shippingDetails.address2 && (
                      <p className="mb-1">{shippingDetails.address2}</p>
                    )}
                    <p className="mb-1">
                      {shippingDetails.city}, {shippingDetails.state}{" "}
                      {shippingDetails.postalCode}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted">
                    No shipping information provided.
                  </p>
                )}
              </div>

              <div className="card shadow-sm p-4">
                <h4 className="fw-bold mb-3">💳 Payment Details</h4>
                {paymentDetails && paymentDetails.cardNumber ? (
                  <div>
                    <p className="mb-1">
                      <strong>Card Holder:</strong>{" "}
                      {paymentDetails.cardHolder || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Card Number:</strong>{" "}
                      {maskCardNumber(paymentDetails.cardNumber)}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted">
                    No payment information provided.
                  </p>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card shadow-lg text-center p-4"
                style={{ borderRadius: "1rem" }}
              >
                <h4 className="fw-bold mb-3">Order Summary</h4>

                <div
                  className="text-start mx-auto"
                  style={{ maxWidth: "260px" }}
                >
                  <p className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${cartTotalCost.toFixed(2)}</span>
                  </p>
                  <p className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </p>
                  <p className="d-flex justify-content-between mb-2">
                    <span>Sales Tax:</span>
                    <span>${calculatedTax.toFixed(2)}</span>
                  </p>
                  <hr className="my-3" />
                  <p className="d-flex justify-content-between fw-bold fs-5">
                    <span>Total:</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </p>
                </div>

                <button
                  className="btn btn-primary btn-lg w-100 mt-4"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || getCartItems().length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderReview;
