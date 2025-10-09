import React from "react";
import {useState} from "react";
import {useNavigate} from 'react-router-dom'

const Purchase = () => {
    const [order, setOrder] = useState({
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
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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
                {order.buyQuantity.map((quantity, index) => {
                    return <div key={index}>
                        <label>Product {index + 1} (${order.itemPrices[index]}):</label>
                        <input
                            type="number"
                            required
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                        />
                        <br/>
                    </div>
                })}
                <button className='button'>Pay</button>
            </form>
        </div>
    );
};

export default Purchase;