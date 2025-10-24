import Header from "../components/Header";
import Footer from "../components/Footer";
import NextStepContext from "../context/NextStepContext";
import { useContext } from "react";
import Search from "../components/Search";
import useFetchSimilar from "../customHooks/useFetchSimilar";
import { Link } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";

const Wishlist = () => {
  const { show, setShow, refreshCounts } = useContext(NextStepContext);

  const { productData, loading, error } = useFetchSimilar(
    "https://next-step-ecommerce-backend.vercel.app/products/wishlist"
  );

  const wishlist = productData ?? [];

  return (
    <>
      {show ? (
        <>
          <Header />
          <Search />
        </>
      ) : (
        <>
        <div className="d-flex flex-column min-vh-100">
            <Header />
          <div className="flex-grow-1">
           
          <div className="container">
            <h3 className="mt-5">Favourites</h3>

            <div>
              {loading && !error && (
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                  <div
                    className="spinner-border text-dark"
                    role="status"
                    aria-label="Loading hot deals"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {!loading && error && (
                <div
                  className="alert alert-danger mt-5 text-center container"
                  role="alert"
                >
                  Failed to load Wishlist. Please try again.
                </div>
              )}

              {!loading && !error && wishlist.length === 0 && (
                <div
                  className="text-center mt-5 py-5 px-3 rounded shadow-sm"
                  style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    color: "#374151",
                  }}
                >
                  <i className="bi bi-heart text-danger fs-1 mb-3 d-block"></i>
                  <h5 className="fw-semibold">No favourites yet ❤️</h5>
                  <p className="text-muted mb-3">
                    Browse our collection and add items you love to your
                    favourites.
                  </p>
                  <Link
                    to="/products/All"
                    className="btn btn-dark rounded-pill px-4 py-2 mt-2"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}

              {!loading && !error && wishlist.length > 0 && (
                <>
                  <WishlistCard data={wishlist} />
                </>
              )}
            </div>
          </div>
         
          </div>
               <Footer />
        </div>
         
        </>
      )}
    </>
  );
};

export default Wishlist;
