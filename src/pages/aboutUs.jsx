import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Kailash Sastry",
            title: "Co-Founder",
            education: "B.S. Computer Science and Engineering, The Ohio State University",
            experience: "3+ years at Battelle as a Software Engineer",
            passion: "Passionate about building communities through shared experiences and bringing joy to families worldwide.",
        },
        {
            name: "Jacob Subler",
            title: "Co-Founder",
            education: "TODO",
            experience: "TODO",
            passion: "Dedicated to ensuring every customer receives their games quickly and in perfect condition. Board game enthusiast since childhood.",
        },
        {
            name: "Drew St. John",
            title: "Co-Founder",
            education: "TODO",
            experience: "TODO",
            passion: "Believes in the power of play to strengthen relationships. On a mission to make board games accessible to everyone.",
        }
    ];

    return (
        <div>
            <Navbar />
            
            {/* Page Header */}
            <div className="bg-primary text-white py-5">
                <div className="container text-center">
                    <h1 className="display-4 fw-bold">About Unbored Board Games</h1>
                    <p className="lead">Bringing people together, one game at a time</p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="container my-5 py-4">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h2 className="fw-bold mb-4">Our Mission</h2>
                        <p className="lead text-muted">
                            To enrich lives by providing high-quality board games that create meaningful 
                            connections, spark joy, and build lasting memories among families and friends.
                        </p>
                        <p>
                            We believe that in our increasingly digital world, face-to-face interactions 
                            around a game board are more valuable than ever. Every game we offer is 
                            carefully selected to ensure it delivers exceptional entertainment value and 
                            brings people closer together.
                        </p>
                    </div>
                    <div className="col-md-6 mb-4">
                        <h2 className="fw-bold mb-4">Our Vision</h2>
                        <p className="lead text-muted">
                            To become the most trusted destination for board game enthusiasts, recognized 
                            for our exceptional curation, customer service, and commitment to the gaming community.
                        </p>
                        <p>
                            We envision a world where every household has a shelf full of games ready 
                            for any occasion, where game nights are a cherished tradition, and where 
                            Unbored Board Games is the first name that comes to mind when seeking quality entertainment.
                        </p>
                    </div>
                </div>
            </div>

            {/* Strategy Statement */}
            <div className="bg-light py-5">
                <div className="container">
                    <h2 className="fw-bold text-center mb-4">Our Strategy</h2>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="display-4 mb-3">🎯</div>
                                    <h5 className="fw-bold">Curated Selection</h5>
                                    <p className="text-muted">
                                        We handpick every game in our catalog, focusing on quality, 
                                        replayability, and broad appeal to ensure customer satisfaction.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="display-4 mb-3">💎</div>
                                    <h5 className="fw-bold">Customer Excellence</h5>
                                    <p className="text-muted">
                                        Superior service at every touchpoint - from browsing to delivery 
                                        to after-sales support - creates loyal, lifelong customers.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="display-4 mb-3">🚀</div>
                                    <h5 className="fw-bold">Operational Excellence</h5>
                                    <p className="text-muted">
                                        Efficient processes and strategic partnerships enable competitive 
                                        pricing and fast delivery without compromising quality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet Our Executives */}
            <div className="container my-5 py-5">
                <h2 className="fw-bold text-center mb-5">Meet Our Leadership Team</h2>
                <div className="row">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100 shadow">
                                <div className="card-body text-center">
                                    <div className="display-1 mb-3">{member.emoji}</div>
                                    <h4 className="fw-bold">{member.name}</h4>
                                    <p className="text-primary fw-bold mb-3">{member.title}</p>
                                    <hr />
                                    <div className="text-start">
                                        <p className="mb-2">
                                            <strong>Education:</strong><br />
                                            <span className="text-muted">{member.education}</span>
                                        </p>
                                        <p className="mb-2">
                                            <strong>Experience:</strong><br />
                                            <span className="text-muted">{member.experience}</span>
                                        </p>
                                        <p className="mb-0">
                                            <strong>Passion:</strong><br />
                                            <span className="text-muted">{member.passion}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Invest Section */}
            <div className="bg-primary text-white py-5">
                <div className="container text-center">
                    <h2 className="fw-bold mb-4">Investment Opportunity</h2>
                    <p className="lead mb-4">
                        Join us in revolutionizing the board game retail experience. With a proven 
                        business model, experienced leadership team, and growing market demand, 
                        Unbored Board Games represents an exceptional investment opportunity.
                    </p>
                    <div className="row mt-5">
                        <div className="col-md-3">
                            <h3 className="display-4 fw-bold">250%</h3>
                            <p>YoY Growth</p>
                        </div>
                        <div className="col-md-3">
                            <h3 className="display-4 fw-bold">15K+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="col-md-3">
                            <h3 className="display-4 fw-bold">4.9★</h3>
                            <p>Average Rating</p>
                        </div>
                        <div className="col-md-3">
                            <h3 className="display-4 fw-bold">98%</h3>
                            <p>Retention Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;