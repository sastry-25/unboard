import React from "react";
import {useState} from "react";
import {useNavigate} from 'react-router-dom'

const Purchase = () => {
    const [order, setOrder] = useState({
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
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Don't forget this!
        navigate('/purchase/paymentEntry', { state: { order: order } });
    }

    const handleQuantityChange = (index, value) => {
        setOrder(prevOrder => {
            const newBuyQuantity = [...prevOrder.buyQuantity];
            newBuyQuantity[index] = value;
            return { ...prevOrder, buyQuantity: newBuyQuantity };
        });
    };

    console.log('order: ', order);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Product 1:</label>
                <input
                    type="number"
                    required
                    onChange={(e) => handleQuantityChange(0, e.target.value)}
                />
                <br/>
                <label>Product 2:</label>
                <input
                    type="number"
                    required
                    onChange={(e) => handleQuantityChange(1, e.target.value)}
                />
                <br/>
                <button className='button'>Pay</button>
            </form>
        </div>
    );
};

export default Purchase;