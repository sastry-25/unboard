import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ContactUs = () => {
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unopened games in original condition. If you're not satisfied with your purchase, contact us for a full refund or exchange."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping typically takes 5-7 business days. Expedited shipping (2-3 business days) is available at checkout for an additional fee."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, we ship within the continental United States. International shipping is coming soon! Sign up for our newsletter to be notified when it's available."
        },
        {
            question: "What if my game arrives damaged?",
            answer: "We're sorry if that happens! Contact us immediately with photos of the damage, and we'll send a replacement at no cost or issue a full refund."
        },
        {
            question: "Can I track my order?",
            answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can use this to monitor your delivery in real-time."
        },
        {
            question: "Do you offer gift wrapping?",
            answer: "Yes! Select the gift wrapping option at checkout. We'll include a personalized message card and elegant wrapping for a small additional fee."
        }
    ];

    return (
        <div>
            <Navbar />
            
            {/* Page Header */}
            <div className="bg-primary text-white py-5">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold">Contact Us</h1>
                    <p className="lead">We're here to help! Reach out anytime.</p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm text-center p-4">
                            <div className="display-4 mb-3">📧</div>
                            <h5 className="fw-bold">Email Support</h5>
                            <p className="text-muted mb-2">For general inquiries and support</p>
                            <a href="mailto:sastry.25@osu.edu" className="text-primary">
                                sastry.25@osu.edu
                            </a>
                            <a href="mailto:subler.41@osu.edu" className="text-primary">
                                subler.41@osu.edu
                            </a>
                            <p className="small text-muted mt-3">Response time: Within 24 hours</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm text-center p-4">
                            <div className="display-4 mb-3">📞</div>
                            <h5 className="fw-bold">Phone Support</h5>
                            <p className="text-muted mb-2">Speak directly with our team</p>
                            <a href="tel:6141234567" className="text-primary h5">
                                (614) 123-4567
                            </a>
                            <p className="small text-muted mt-3">
                                Mon-Fri: 9:00 AM - 6:00 PM EST<br />
                                Sat: 10:00 AM - 4:00 PM EST
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm text-center p-4">
                            <div className="display-4 mb-3">💬</div>
                            <h5 className="fw-bold">Live Chat</h5>
                            <p className="text-muted mb-2">Instant assistance online</p>
                            <button className="btn btn-primary mt-2">Start Chat</button>
                            <p className="small text-muted mt-3">
                                Available during business hours<br />
                                Average wait time: 2 minutes
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;