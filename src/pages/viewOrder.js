import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewOrder = () => {
  const title = "View Order Page";
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order || { 
    buyQuantity: [0,0,0,0,0],
    itemPrices: [10, 15, 20, 25, 30],
    credit_card_number: '', 
    expir_date: '', 
    cvvCode: '',
    card_holder_name: '', 
    address_1: '', 
    address_2: '', 
    city: '', 
    state: '', 
    zip: '',
  };

  const subTotals = order.buyQuantity.map((quantity, index) =>
    quantity > 0 ? quantity * order.itemPrices[index] : 0
  );
  const totalCost = subTotals.reduce((sum, val) => sum + val, 0);

  const getAddress = () => {
    let addressString = order.address_1 || '';
    if (order.address_2) addressString += ' ' + order.address_2;
    addressString += ` ${order.city}, ${order.state} ${order.zip}`;
    return addressString.trim();
  };

  const handlePlaceOrder = () => {
    const updatedOrder = {
      ...order,
      totalCost,
      subTotals
    };
    navigate('/purchase/viewConfirmation', { state: { order: updatedOrder } });
  };

  return (
    <div>
      <h1>{title}</h1>

      <h2>Shipping Details</h2>
      <div>
        <p>{order.card_holder_name}</p>
        <p>{getAddress()}</p>
      </div>

      <br />
      <h2>Items Purchased</h2>
      {subTotals.map((subTotal, index) => (
        subTotal > 0 && (
          <div key={index}>
            <h3>Product {index + 1}</h3>
            <p>Quantity: {order.buyQuantity[index]}</p>
            <p>Subtotal: ${subTotal.toFixed(2)}</p>
          </div>
        )
      ))}

      <h2>Total Cost: ${totalCost}</h2>

      <button onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default ViewOrder;
