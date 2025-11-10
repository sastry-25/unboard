import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart, catalog, loading, error } = useCart();

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
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading products...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error Loading Products</h4>
            <p>{error}</p>
            <hr />
            <p className="mb-0">Please try refreshing the page.</p>
          </div>
        ) : catalog.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="fw-bold mb-3">No products available</h3>
            <p className="text-muted">Check back soon for new items!</p>
          </div>
        ) : (
          <div className="row">
            {catalog.map((rawProduct) => {
              // Normalize backend → frontend naming
              const product = {
                id: rawProduct.id || rawProduct.ID,
                name: rawProduct.name || rawProduct.NAME || "Unnamed Game",
                description: rawProduct.description || rawProduct.DESCRIPTION || "No description provided.",
                price: rawProduct.price || rawProduct.UNIT_PRICE || 0,
                players: rawProduct.players || rawProduct.PLAYERS || "N/A",
                time: rawProduct.time || rawProduct.TIME || "Unknown",
                age: rawProduct.age || rawProduct.AGE || "All ages",
                quantity:
                  rawProduct.available_quantity ||
                  rawProduct.AVAILABLE_QUANTITY ||
                  rawProduct.quantity ||
                  0,
              };

              return (
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
                      {product.quantity !== undefined && (
                        <div className="small text-muted mb-2">
                          <div>📦 In Stock: {product.quantity}</div>
                        </div>
                      )}
                    </div>
                    <div className="card-footer bg-white border-top-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h4 mb-0 text-primary fw-bold">
                          ${Number(product.price).toFixed(2)}
                        </span>
                        <button
                          className="btn btn-primary"
                          onClick={() => addToCart(product.id)}
                          disabled={product.quantity === 0}
                        >
                          {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
