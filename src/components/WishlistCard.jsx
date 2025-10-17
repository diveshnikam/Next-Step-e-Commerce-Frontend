import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import NextStepContext from "../context/NextStepContext";
import Footer from "./Footer";

const WishlistCard = ({ data }) => {
  const { setShow, refreshCounts } = useContext(NextStepContext);

  const [details, setDetails] = useState(data);
  const [alert, setAlert] = useState(false);
  const [cartAlert, setCartAlert] = useState(false);

  const deleteWishlistItem = (prdId) => {
    fetch(
      `https://next-step-ecommerce-backend.vercel.app/products/wishlist/${prdId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDetails((prev) => prev.filter((p) => p._id !== prdId));

        setAlert(true);

        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const cartHandler = (id) => {
    fetch("https://next-step-ecommerce-backend.vercel.app/products/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDetails((prev) => prev.filter((item) => item.productId._id !== id));

        setCartAlert(true);

        refreshCounts()

        setTimeout(() => {
          setCartAlert(false);
        }, 3000);
      })
      .catch((err) => console.error("Error updating wishlist:", err));
  };
  return (
    <>
      {alert && (
        <div className="text-center mt-5 py-4">
          <i className="bi bi-check-circle text-success fs-1 mb-3 d-block"></i>
          <h5 className="text-black">
            Product removed from your Favourites 🖤
          </h5>
        </div>
      )}

      {cartAlert && (
        <div className="text-center mt-5 py-4 fade-in">
          <i className="bi bi-cart-check-fill text-success fs-1 mb-3 d-block"></i>
          <h5 className="text-black">Product added to your Cart 🛒</h5>
        </div>
      )}

      {details.length === 0 && (
        <div className="text-center mt-5 py-5">
          <i className="bi bi-heart text-danger fs-1 mb-3 d-block"></i>
          <h4 className="text-secondary">Your wishlist is empty 🖤</h4>
          <p className="text-muted">Browse products and add your favourites!</p>
          <Link
            to="/products/all"
            className="btn btn-dark rounded-pill px-4 py-2 mt-3"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      <div className="row g-5 mt-3">
        {details.map((item, index) => {
          const product = item.productId;
          if (!product) return null;

          const {
            name,
            category,
            gender,
            price,
            mrp,
            discountPercent,
            thumbnail,
            _id,
            colors,
          } = product;

          return (
            <div className="col-12 col-sm-6 col-lg-4 mb-4" key={index}>
              <div className="position-relative">
                <div className="ratio ratio-4x3">
                  <Link to={`/product/${_id}`} onClick={() => setShow(false)}>
                    <img
                      src={thumbnail}
                      alt={name}
                      className="w-100 h-100 object-fit-cover rounded-3 category-img"
                      style={{ objectPosition: "center" }}
                    />
                  </Link>
                </div>

                <div className="p-3">
                  <h5 className="mt-3 mb-2">{name}</h5>
                  <h6 className="text-secondary fw-light">
                    {gender}'s {category}
                  </h6>
                  <h6 className="text-secondary fw-light mb-3">
                    Colors{" "}
                    {Array.isArray(colors)
                      ? colors.length
                      : colors && typeof colors === "object"
                      ? Object.keys(colors).length
                      : 0}
                  </h6>
                  <div className="d-flex align-items-baseline gap-3">
                  
                    <h5 className="">
                      ₹ {price}
                    </h5>

                      {discountPercent > 0 && <small className=" text-secondary fw-light">MRP : {mrp}</small>}


                    <button
                      className="btn btn-white rounded-pill wishlist-hover me-1"
                      onClick={(e) => deleteWishlistItem(item._id)}
                    >
                      <i className="bi bi-trash fs-4"></i>
                    </button>

                    <button
                      className="btn btn-white rounded-pill wishlist-hover"
                      onClick={(e) => cartHandler(_id)}
                    >
                      <i className="bi bi-cart-plus fs-4"></i>
                    </button>
                  </div>

                  {discountPercent > 0 && (
                    <span className="position-absolute top-0 start-0 mt-1 ms-1 px-2 py-1 bg-black text-white small fw-semibold rounded-1">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WishlistCard;
