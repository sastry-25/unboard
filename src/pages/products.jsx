import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useCart } from '../context/CartContext';

const Products = () => {
    const { addItem } = useCart();
    const products = [
        {
            id: 1,
            name: "Strategy Master",
            price: 10,
            description: "Perfect for strategic thinkers! Build your empire and outwit your opponents.",
            players: "2-4 players",
            time: "60-90 min",
            age: "12+"
        },
        {
            id: 2,
            name: "Family Fun Night",
            price: 15,
            description: "Easy to learn, fun for all ages. The perfect game for family gatherings.",
            players: "3-6 players",
            time: "30-45 min",
            age: "8+"
        },
        {
            id: 3,
            name: "Quick Draw Deluxe",
            price: 20,
            description: "Fast-paced drawing and guessing game. Creativity meets competition!",
            players: "4-8 players",
            time: "20-30 min",
            age: "10+"
        },
        {
            id: 4,
            name: "Mystery Manor",
            price: 25,
            description: "Solve the mystery before time runs out. Clues, suspects, and surprises!",
            players: "2-6 players",
            time: "45-60 min",
            age: "14+"
        },
        {
            id: 5,
            name: "Adventure Quest",
            price: 30,
            description: "Epic cooperative adventure. Work together to save the kingdom!",
            players: "1-5 players",
            time: "90-120 min",
            age: "12+"
        }
    ];

    const addToCart = (productId) => {
        addItem(products[productId - 1]);
    }

    return (
        <div>
            <Navbar />
            
            {/* Page Header */}
            <div className="bg-primary text-white py-4">
                <div className="container">
                    <h1 className="display-4 fw-bold">Our Board Games Collection</h1>
                    <p className="lead">Discover games that bring people together</p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container my-5">
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <div className="text-center mb-3 display-4">🎲</div>
                                    <h5 className="card-title fw-bold">{product.name}</h5>
                                    <p className="card-text text-muted">{product.description}</p>
                                    <hr />
                                    <div className="small text-muted mb-2">
                                        <div>👥 {product.players}</div>
                                        <div>⏱️ {product.time}</div>
                                        <div>🎯 Ages {product.age}</div>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-top-0">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="h4 mb-0 text-primary fw-bold">${product.price}</span>
                                        <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
                                            Add to Cart
                                        </button>
                                        {/* <Link to="/purchase" className="btn btn-primary">
                                            Add to Cart
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-5 p-5 bg-light rounded">
                    <h3 className="fw-bold mb-3">Ready to Purchase?</h3>
                    <p className="text-muted mb-4">
                        Head to our checkout to select quantities and complete your order.
                    </p>
                    <Link to="/purchase" className="btn btn-primary btn-lg">
                        Go to Checkout
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Products;