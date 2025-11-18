import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const ShippingEntry = () => {
  const navigate = useNavigate();
  const { setShippingDetails } = useOrder();

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zip, setZip] = useState("");
  const [shippingEstimate, setShippingEstimate] = useState(0);

  useEffect(() => {
    setShippingEstimate(0);
  }, []);

  useEffect(() => {
    if (/^[A-Z]{2}$/.test(stateVal)) {
      setShippingEstimate(Math.floor(Math.random() * 4) + 2);
    }
  }, [stateVal]);

  const handleStateChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    if (value.length > 2) value = value.slice(0, 2);
    setStateVal(value);
  };

  const handleZipChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) value = value.slice(0, 5);
    setZip(value);
  };

  const isAddress1Valid = address1.trim().length >= 1;
  const isCityValid = city.trim().length >= 1;
  const isStateValid = /^[A-Z]{2}$/.test(stateVal);
  const isZipValid = /^\d{5}$/.test(zip);
  const isFormValid =
    isAddress1Valid && isCityValid && isStateValid && isZipValid;

  const updateShippingDetails = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setShippingDetails({
      address1: address1,
      address2: address2,
      city: city,
      state: stateVal,
      postalCode: zip,
    });

    navigate("/order/viewOrder");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <div className="bg-primary text-white py-4">
          <div className="container">
            <h1 className="display-5 fw-bold">Shipping Information</h1>
            <p className="lead">Enter your shipping details to continue</p>
          </div>
        </div>

        <div className="container my-5">
          <div className="row justify-content-center align-items-stretch">
            {/* Left Column - Shipping Form */}
            <div className="col-md-5 d-flex justify-content-end pe-5">
              <div className="d-inline-block text-end align-self-center">
                <form
                  className="text-start"
                  onSubmit={updateShippingDetails}
                  style={{ maxWidth: "300px" }}
                >
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="100 Example Dr."
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Apt, Suite, Unit, etc."
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <label className="form-label fw-semibold">City</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Columbus"
                          style={{ maxWidth: "150px" }}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="form-label fw-semibold">State</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="OH"
                          style={{ maxWidth: "100px" }}
                          value={stateVal}
                          onChange={handleStateChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="form-label fw-semibold">Zip</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="12345"
                      style={{ maxWidth: "150px" }}
                      value={zip}
                      onChange={handleZipChange}
                    />
                  </div>

                  <div className="mt-5">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      disabled={!isFormValid}
                      style={{
                        opacity: isFormValid ? 1 : 0.6,
                        cursor: isFormValid ? "pointer" : "not-allowed",
                      }}
                    >
                      Confirm Shipping
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Shipping Estimate Card */}
            <div className="col-md-5 d-flex justify-content-start align-items-center ps-5">
              <div
                className="card shadow-lg text-center p-4"
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "1rem",
                }}
              >
                <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
                  <h4 className="fw-bold mb-3">
                    Shipping Estimate – {shippingEstimate} weeks
                  </h4>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    🚚
                  </div>
                  <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    * shipping estimates may vary based on location and
                    availability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingEntry;
