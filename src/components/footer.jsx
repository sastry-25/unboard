import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 pt-4 pb-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5 className="fw-bold">🎲 Unbored Board Games</h5>
                        <p className="text-white">
                            Bringing families and friends together, one game at a time.
                        </p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h6 className="fw-bold">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-decoration-none text-white">Home</Link></li>
                            <li><Link to="/products" className="text-decoration-none text-white">Products</Link></li>
                            <li><Link to="/about" className="text-decoration-none text-white">About Us</Link></li>
                            <li><Link to="/contact" className="text-decoration-none text-white">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h6 className="fw-bold">Customer Support</h6>
                        <ul className="list-unstyled text-white">
                            <li>Email: sastry.25@osu.edu</li>
                            <li>Phone: (614) 123-4567</li>
                            <li>Hours: Mon-Fri 9AM-6PM EST</li>
                        </ul>
                    </div>
                </div>
                <hr className="bg-secondary"/>
                <div className="row">
                    <div className="col text-center text-white">
                        <p className="mb-0">&copy; 2025 Unbored Board Games. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;