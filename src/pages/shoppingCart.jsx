import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartQuantity, cartTotalCost, getCartItems } = useCart();

  return (
    <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
            {/* Page Header */}
            <div className="bg-primary text-white py-4">
                <div className="container">
                    <h1 className="display-4 fw-bold">Your Shopping Cart</h1>
                    <p className="lead">Review your items before checkout</p>
                </div>
            </div>

            {/* Cart Items Grid */}
            <div className="container my-5">
                {cartQuantity === 0 ? (
                    <div className="text-center py-5">
                        <h3 className="fw-bold mb-3">Your cart is empty</h3>
                        <p className="text-muted">Browse our collection to add some games!</p>
                    </div>
                ) : (
                    <>
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {getCartItems().map((item) => (
                                <div key={item.id} className="col">
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <p className="text-center mb-3 display-4">🎲</p>
                                                <h5 className="card-title fw-bold">{item.name}</h5>
                                                <p className="card-text text-muted mb-2">
                                                    Quantity: {item.quantity}
                                                </p>
                                                <p className="card-text text-primary fw-bold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Confirm Button and Price*/}
                        <div className="flex-1 place-content-between text-center mt-5">
                            <h4 className="fw-bold mb-3">
                                Total Price: ${cartTotalCost}
                            </h4>
                            <div>
                                <button className="btn btn-primary btn-lg px-5" disabled>
                                    Confirm Purchase
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>

        <Footer />
    </div>
  );
};

export default CartPage;
