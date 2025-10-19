import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const OrderReview = () => {
  const navigate = useNavigate();
  const { getCartItems, cartTotalCost, clearCart } = useCart();
  const { shippingDetails, paymentDetails, salesTax, shippingCost, clearOrderDetails } = useOrder();

  const calculatedTax = (cartTotalCost + shippingCost) * salesTax;
  const orderTotal = cartTotalCost + shippingCost + calculatedTax;

  const maskCardNumber = (number) => {
    if (!number) return "";
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.length < 16) return "Invalid Number";
    return ("**** **** **** ") + cleaned.slice(12);
  };

  const handlePlaceOrder = () => {
    clearCart();
    clearOrderDetails();
    navigate("/purchase/viewConfirmation")
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        {/* Page Header */}
        <div className="bg-primary text-white py-4">
          <div className="container text-center">
            <h1 className="display-5 fw-bold">Order Review</h1>
            <p className="lead">Confirm your order details before submission</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container my-5">
          <div className="row justify-content-center align-items-start g-5">
            {/* Order Details */}
            <div className="col-md-7">
              {/* Cart Summary */}
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
                         style={{
                           minWidth: "70%",
                           wordBreak: "break-word",
                         }}
                       >
                          <strong>{item.name}</strong>
                          <br />
                          <span className="text-muted">Quantity: {item.quantity}</span>
                        </div>
                        <span
                          className="fw-semibold text-end"
                          style={{ minWidth: "25%", textAlign: "right" }}
                        >
                         ${(item.price * item.quantity).toFixed(2)}
                        </span>
                     </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Shipping Details */}
              <div className="card shadow-sm mb-5 p-4">
                <h4 className="fw-bold mb-3">📦 Shipping Details</h4>
                {shippingDetails && shippingDetails.address_1 ? (
                  <div>
                    <p className="mb-1">{shippingDetails.address_1}</p>
                    {shippingDetails.address_2 && (
                      <p className="mb-1">{shippingDetails.address_2}</p>
                    )}
                    <p className="mb-1">
                      {shippingDetails.city}, {shippingDetails.state}{" "}
                      {shippingDetails.zip}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted">No shipping information provided.</p>
                )}
              </div>

              {/* Payment Details */}
              <div className="card shadow-sm p-4">
                <h4 className="fw-bold mb-3">💳 Payment Details</h4>
                {paymentDetails && paymentDetails.credit_card_number ? (
                  <div>
                    <p className="mb-1">
                      <strong>Card Holder:</strong>{" "}
                      {paymentDetails.card_holder_name || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Card Number:</strong>{" "}
                      {maskCardNumber(paymentDetails.credit_card_number)}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted">No payment information provided.</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-4">
              <div
                className="card shadow-lg text-center p-4"
                style={{ borderRadius: "1rem" }}
              >
                <h4 className="fw-bold mb-3">Order Summary</h4>

                <div className="text-start mx-auto" style={{ maxWidth: "260px" }}>
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
                  onClick={() => handlePlaceOrder()}
                >
                  Place Order
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
