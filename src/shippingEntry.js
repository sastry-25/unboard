import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ShippingEntry = () => {
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

    const [shippingInfo, setShippingInfo] = useState({
        address_1: order.address_1 || '',
        address_2: order.address_2 || '',
        city: order.city || '',
        state: order.state || '',
        zip: order.zip || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Update order with shipping information
        const updatedOrder = {
            ...order,
            ...shippingInfo
        };

        // This is where we navigate to confirmation or next page!! 
        navigate('/purchase/confirmation', { state: { order: updatedOrder } });
    };

    return (
        <div>
            <h2>Shipping Information</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Address Line 1:</label>
                    <input
                        type="text"
                        name="address_1"
                        value={shippingInfo.address_1}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        required
                    />
                </div>
                <br/>

                <div>
                    <label>Address Line 2:</label>
                    <input
                        type="text"
                        name="address_2"
                        value={shippingInfo.address_2}
                        onChange={handleInputChange}
                        placeholder="Apartment, suite, etc. (optional)"
                    />
                </div>
                <br/>

                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <br/>

                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        maxLength="2"
                        pattern="[A-Z]{2}"
                        placeholder="e.g., CA, NY"
                        required
                    />
                </div>
                <br/>

                <div>
                    <label>ZIP Code:</label>
                    <input
                        type="text"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleInputChange}
                        pattern="\d{5}"
                        maxLength="5"
                        placeholder="12345"
                        required
                    />
                </div>
                <br/>

                <button type="submit" className="button">Complete Order</button>
            </form>
        </div>
    );
};

export default ShippingEntry;