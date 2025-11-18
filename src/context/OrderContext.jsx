import { createContext, useContext, useState } from "react";
import CartProvider from "./CartContext";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [salesTax, setSalesTax] = useState(0.07);
  const [shippingCost, setShippingCost] = useState(10.99);

  const [paymentDetails, setPaymentDetails] = useState({
    cardHolder: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [shippingDetails, setShippingDetails] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const clearOrderDetails = () => {
    setPaymentDetails({
      cardHolder: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    });
    setShippingDetails({
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  return (
    <OrderContext.Provider
      value={{
        salesTax,
        setSalesTax,
        shippingCost,
        setShippingCost,
        paymentDetails,
        setPaymentDetails,
        shippingDetails,
        setShippingDetails,
        clearOrderDetails,
      }}
    >
      <CartProvider>{children}</CartProvider>
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);

export default OrderProvider;
