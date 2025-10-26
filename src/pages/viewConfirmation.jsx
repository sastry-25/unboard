import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [orderTotal, setOrderTotal] = useState(null);

  useEffect(() => {
    // Get confirmation number from navigation state (passed from viewOrder)
    if (location.state?.confirmationNumber) {
      setConfirmationNumber(location.state.confirmationNumber);
      setOrderTotal(location.state.orderTotal);
    } else {
      // Fallback: generate random if somehow accessed directly
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setConfirmationNumber(`ORD-${randomNum}`);
    }
  }, [location.state]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        {/* Page Header */}
        <div className="bg-primary text-white py-4">
          <div className="container text-center">
            <h1 className="display-5 fw-bold">Order Confirmed 🎉</h1>
            <p className="lead">Thank you for your purchase!</p>
          </div>
        </div>

        {/* Confirmation Content */}
        <div className="container my-5 d-flex flex-column align-items-center">
          <div
            className="card shadow-lg text-center p-5"
            style={{ maxWidth: "500px", borderRadius: "1rem" }}
          >
            <h3 className="fw-bold mb-3">Thank You!</h3>
            <p className="mb-4 fs-5">
              Your order has been successfully placed. We're getting it ready to
              ship to you soon.
            </p>

            <div className="bg-light rounded py-3 px-4 mb-4 border">
              <p className="mb-0 fw-semibold">Confirmation Number:</p>
              <h4 className="fw-bold text-primary mt-2 mb-0">
                {confirmationNumber}
              </h4>
            </div>

            {orderTotal && (
              <div className="bg-light rounded py-3 px-4 mb-4 border">
                <p className="mb-0 fw-semibold">Order Total:</p>
                <h5 className="fw-bold text-success mt-2 mb-0">
                  ${orderTotal.toFixed(2)}
                </h5>
              </div>
            )}

            <p className="text-muted mb-5" style={{ fontSize: "0.95rem" }}>
              A confirmation email will be sent to your account shortly.
            </p>

            <button
              className="btn btn-primary btn-lg px-4"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;