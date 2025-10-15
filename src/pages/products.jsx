import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useCart } from '../context/CartContext';

const Products = () => {
    const { addToCart, catalog } = useCart();

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
                    {catalog.map((product) => (
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