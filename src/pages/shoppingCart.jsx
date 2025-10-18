import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";
import CartItemCard from "../components/cartItemCard";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartQuantity, shippingCost, cartTotalCost, getCartItems } = useCart();

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
                            <p className="text-muted">
                                Browse our <Link to="/products" className="text-decoration-underline text-primary">collection</Link> to add some games!
                            </p>
                    </div>
                ) : (
                    <>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {getCartItems().map((item) => (
                                <div key={item.id} className="col">
                                    <CartItemCard item={item}/>
                                </div>
                            ))}
                        </div>

                        {/* Confirm Button and Price*/}
                        <div className="flex-1 place-content-between text-center mt-5">
                            <div className="rounded-lg border border-1 border-black"/>
                            <div className="p-4">
                                <h4>Subtotal: ${cartTotalCost.toFixed(2)}</h4>
                                <p> * Additional shipping costs and tax will be calculated at checkout</p>
                            </div>
                            <div>
                                <button className="btn btn-primary btn-lg px-5" enabled={cartQuantity > 0}>
                                    Continue to Checkout
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
