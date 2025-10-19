import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            
            <div className="bg-primary text-white py-5">
                <div className="container text-center py-5">
                    <h1 className="display-3 fw-bold mb-4">Get Unbored with Amazing Board Games!</h1>
                    <p className="lead mb-4">
                        Discover our curated collection of board games that bring families and friends together.
                    </p>
                    <Link to="/products" className="btn btn-light btn-lg me-3">Browse Games</Link>
                </div>
            </div>

            <div className="container my-5 py-5">
                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <div className="display-4 mb-3">🎯</div>
                        <h4 className="fw-bold">Premium Quality</h4>
                        <p className="text-muted">
                            Carefully selected games that guarantee hours of entertainment and engagement.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="display-4 mb-3">🚚</div>
                        <h4 className="fw-bold">Fast Shipping</h4>
                        <p className="text-muted">
                            Quick and reliable delivery to get your games to you as soon as possible.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="display-4 mb-3">💯</div>
                        <h4 className="fw-bold">100% Satisfaction</h4>
                        <p className="text-muted">
                            Not happy? We offer easy returns and excellent customer support.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-light py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="fw-bold mb-4">Why Choose Unbored Board Games?</h2>
                            <p className="mb-3">
                                We're passionate about bringing people together through the joy of board gaming. 
                                Our mission is to help you discover games that create lasting memories.
                            </p>
                            <ul className="list-unstyled">
                                <li className="mb-2">Curated selection of family-friendly games</li>
                                <li className="mb-2">Expert recommendations and reviews</li>
                                <li className="mb-2">Competitive pricing with frequent promotions</li>
                                <li className="mb-2">Dedicated customer support team</li>
                            </ul>
                            <Link to="/about" className="btn btn-primary mt-3">Learn More About Us</Link>
                        </div>
                        <div className="col-md-6 text-center">
                            <div className="display-1">🎲🃏🎯</div>
                            <p className="text-muted mt-3">Board games for every occasion</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center my-5 py-5">
                <h2 className="fw-bold mb-4">Ready to Get Started?</h2>
                <p className="lead text-muted mb-4">
                    Browse our collection and find your next favorite game today!
                </p>
                <Link to="/products" className="btn btn-primary btn-lg">View All Products</Link>
            </div>

            <Footer />
        </div>
    );
};

export default Home;