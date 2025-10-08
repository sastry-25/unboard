import React from 'react';
import { Link } from 'react-router-dom';

const ViewConfirmation = () => {
    let title = "View Confirmation Page";
    return (
        <div>
            <h1>{title}</h1>
            <p>Your order has been successfully placed!</p>

            <Link to="/purchase">
                <button>Start a New Purchase</button>
            </Link>
        </div>
    );
};

export default ViewConfirmation;