import React from 'react';
import { Link } from 'react-router-dom';

const ViewOrder = () => {
    let title = "View Order Page";
    return (
        <div>
            <h1>{title}</h1>
            {/* Order summary content would go here */}

            <Link to="/purchase/viewConfirmation">
                <button>Place Order</button>
            </Link>
        </div>
    );
};

export default ViewOrder;