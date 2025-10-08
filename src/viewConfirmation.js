import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ViewConfirmation = () => {
    const location = useLocation();
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

    return (
        <div>
            <h2>Order Confirmed</h2>

            <div>
                <div>
                    <h3>Thank you for your order!</h3>
                    <p>Product 1: {order.buyQuantity[0]}</p>
                    <p>Product 2: {order.buyQuantity[2]}</p>
                </div>

                <p>Your Confirmation Number is: <b>#1234567890</b></p>
            </div>

            <Link to="/purchase">
                <button>Start a New Purchase</button>
            </Link>
        </div>
    );
};

export default ViewConfirmation;