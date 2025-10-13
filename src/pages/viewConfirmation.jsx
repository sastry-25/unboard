import React from 'react';
import { Link } from 'react-router-dom';

const ViewConfirmation = () => {
    return (
        <div>
            <h2>Order Confirmed</h2>

            <div>
                <h3>Thank you for your order!</h3>

                <p>Your Confirmation Number is: <b>#1234567890</b></p>
            </div>

            <Link to="/purchase">
                <button>Start a New Purchase</button>
            </Link>
        </div>
    );
};

export default ViewConfirmation;