import { createContext, useContext, useState } from 'react';
import CartProvider from './CartContext';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [salesTax, setSalesTax] = useState(0.07);
  const [shippingCost, setShippingCost] = useState(10.99);
  const [paymentDetails, setPaymentDetails] = useState({
    credit_card_number: '',
    expir_date: '',
    cvvCode: '',
    card_holder_name: ''
  });
  const [shippingDetails, setShippingDetails] = useState({
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zip: ''
  });

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
        setShippingDetails
      }}
    >
      <CartProvider>{children}</CartProvider>
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);

export default OrderProvider;
