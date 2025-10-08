import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentEntry = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order || { 
        buyQuantity: [0,0,0,0,0],
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

    const [paymentInfo, setPaymentInfo] = useState({
        credit_card_number: order.credit_card_number || '',
        expir_date: order.expir_date || '',
        cvvCode: order.cvvCode || '',
        card_holder_name: order.card_holder_name || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Update order with payment information
        const updatedOrder = {
            ...order,
            ...paymentInfo
        };

        // Navigate to shipping entry page
        navigate('/purchase/shippingEntry', { state: { order: updatedOrder } });
    };

    return (
        <div>
            <h2>Payment Information</h2>
            <div>
                <h3>Order Summary:</h3>
                <p>Product 1: {order.buyQuantity[0]}</p>
                <p>Product 2: {order.buyQuantity[1]}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Card Holder Name:</label>
                    <input
                        type="text"
                        name="card_holder_name"
                        value={paymentInfo.card_holder_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br/>

                <div>
                    <label>Credit Card Number:</label>
                    <input
                        type="text"
                        name="credit_card_number"
                        value={paymentInfo.credit_card_number}
                        onChange={handleInputChange}
                        pattern="\d{16}"
                        maxLength="16"
                        placeholder="1234567890123456"
                        required
                    />
                </div>
                <br/>

                <div>
                    <label>Expiration Date (MM/YY):</label>
                    <input
                        type="text"
                        name="expir_date"
                        value={paymentInfo.expir_date}
                        onChange={handleInputChange}
                        pattern="\d{2}/\d{2}"
                        maxLength="5"
                        placeholder="MM/YY"
                        required
                    />
                </div>
                <br/>

                <div>
                    <label>CVV Code:</label>
                    <input
                        type="text"
                        name="cvvCode"
                        value={paymentInfo.cvvCode}
                        onChange={handleInputChange}
                        pattern="\d{3,4}"
                        maxLength="4"
                        placeholder="123"
                        required
                    />
                </div>
                <br/>

                <button type="submit" className="button">Continue to Shipping</button>
            </form>
        </div>
    );
};

export default PaymentEntry;