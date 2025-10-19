import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const PaymentEntry = () => {
  const navigate = useNavigate();
  const { cartTotalCost } = useCart();
  const { setPaymentDetails, salesTax, shippingCost } = useOrder();
  const calculatedTax = (cartTotalCost + shippingCost) * salesTax;
  const orderTotal = cartTotalCost + shippingCost + calculatedTax;

  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setExpDate(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  const unformattedCardNumber = cardNumber.replace(/\s/g, "");
  const unformattedExpDate = expDate.replace("/", "");

  const isCardHolderValid = cardHolder.trim().length >= 1;
  const isCardNumberValid = unformattedCardNumber.length === 16;
  const isExpDateValid = unformattedExpDate.length === 4;
  const isCvvValid = cvv.length === 3;

  const isFormValid =
    isCardHolderValid &&
    isCardNumberValid &&
    isExpDateValid &&
    isCvvValid;

  const updatePaymentDetails = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setPaymentDetails({
      credit_card_number: unformattedCardNumber,
      expir_date: unformattedExpDate,
      cvvCode: cvv,
      card_holder_name: cardHolder,
    });

    navigate("/purchase/shippingEntry");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        {/* Page Header */}
        <div className="bg-primary text-white py-4">
          <div className="container">
            <h1 className="display-5 fw-bold">Payment Information</h1>
            <p className="lead">
              Enter your payment details to complete checkout
            </p>
          </div>
        </div>

        <div className="container my-5">
          <div className="row justify-content-center align-items-stretch">
            {/* Cost Information */}
            <div className="col-md-5 d-flex justify-content-end pe-5">
              <div className="d-inline-block text-end align-self-center">
                <p className="fs-5 mb-3">
                  <strong>Subtotal:</strong> ${cartTotalCost.toFixed(2)}
                </p>
                <p className="fs-5 mb-3">
                  <strong>Shipping Cost:</strong> ${shippingCost.toFixed(2)}
                </p>
                <p className="fs-5 mb-4">
                  <strong>Sales Tax:</strong> ${calculatedTax.toFixed(2)}
                </p>

                <div
                  className="bg-dark rounded-pill mx-0 mb-4 ms-auto"
                  style={{ height: "2px", width: "100%" }}
                />

                <p className="fs-4 fw-bold">
                  <strong>Total:</strong> ${orderTotal.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="col-md-1 d-flex justify-content-center">
              <div
                className="bg-dark rounded-pill align-self-center"
                style={{
                  width: "3px",
                  height: "85%",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              ></div>
            </div>

            {/* Payment Fields */}
            <div className="col-md-5">
              <form className="ps-4 text-start" onSubmit={updatePaymentDetails}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Card Holder</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="John Doe"
                    style={{ maxWidth: "300px" }}
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Credit Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="0000 1111 2222 3333"
                    style={{ maxWidth: "300px" }}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </div>

                <div className="mb-5" style={{ maxWidth: "300px" }}>
                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <label className="form-label fw-semibold">Exp. Date</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="01/26"
                        style={{ maxWidth: "100px" }}
                        value={expDate}
                        onChange={handleExpDateChange}
                      />
                    </div>
                    <div>
                      <label className="form-label fw-semibold">CVV</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="123"
                        style={{ maxWidth: "80px" }}
                        value={cvv}
                        onChange={handleCvvChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="mt-5" style={{ maxWidth: "300px" }}>
                  <button
                    className="btn btn-primary btn-lg w-100"
                    type="submit"
                    disabled={!isFormValid}
                    style={{
                      opacity: isFormValid ? 1 : 0.6,
                      cursor: isFormValid ? "pointer" : "not-allowed",
                    }}
                  >
                    Confirm Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentEntry;
