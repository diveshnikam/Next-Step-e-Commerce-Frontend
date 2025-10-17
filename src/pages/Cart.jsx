import Header from "../components/Header";
import Footer from "../components/Footer";
import NextStepContext from "../context/NextStepContext";
import { useContext, useState, useEffect } from "react";
import Search from "../components/Search";
import useFetchSimilar from "../customHooks/useFetchSimilar";
import { Link } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";

const Cart = () => {
  const { show,  cartCount, setCartCount, refreshCounts } = useContext(NextStepContext);

  const { productData, loading, error } = useFetchSimilar(
    "https://next-step-ecommerce-backend.vercel.app/products/cart"
  );

  const [cartItems, setCartItems] = useState(productData ?? []);
  const [alertCart, setAlertCart] = useState(false);
  const [deleteCart, setDeleteCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (productData) setCartItems(productData);
  }, [productData]);

 


  const addQty = (id) => {
    fetch(
      `https://next-step-ecommerce-backend.vercel.app/products/cart/increase/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      })
      .catch((err) => console.error("Error:", err));
  };

  const decreaseQty = (id) => {
    fetch(
      `https://next-step-ecommerce-backend.vercel.app/products/cart/decrease/${id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity > 1 ? item.quantity - 1 : item.quantity,
                }
              : item
          )
        );
      })
      .catch((err) => console.error("Error:", err));
  };

  const wishlistHandler = (id) => {
    fetch(`https://next-step-ecommerce-backend.vercel.app/products/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCartItems((prev) =>
          prev.filter((product) => product.productId._id !== id)
        );
        setAlertCart(true);

        refreshCounts()

        setTimeout(() => {
          setAlertCart(false);
        }, 3000);
      });
  };

  const deleteCartItem = (prdId) => {
    fetch(
      `https://next-step-ecommerce-backend.vercel.app/products/cart/${prdId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCartItems((prev) => prev.filter((p) => p._id !== prdId));

        setDeleteCart(true);

        refreshCounts()

        setTimeout(() => {
          setDeleteCart(false);
        }, 3000);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

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
                {deleteCart && (
                  <div className="text-center mt-5 mb-5 py-4">
                    <i className="bi bi-check-circle text-success fs-1 mb-3 d-block"></i>
                    <h5 className="text-black">
                      Product removed from your Bag 🛍️
                    </h5>
                  </div>
                )}

                {alertCart && (
                  <div className="text-center mt-5 mb-5 py-4 fade-in">
                    <i className="bi bi-cart-check-fill text-success fs-1 mb-3 d-block"></i>
                    <h5 className="text-black">
                      Product added to your Cart 🛒
                    </h5>
                  </div>
                )}
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
                      className="alert alert-danger mt-5 text-center"
                      role="alert"
                    >
                      Failed to load Cart. Please try again.
                    </div>
                  )}

                  {!loading && !error && cartItems.length === 0 && (
                    <div className="text-center mt-5 py-5 px-4">
                      <i className="bi bi-bag-x-fill text-secondary fs-1 mb-3"></i>
                      <h5 className="fw-semibold text-dark mb-2 mt-3">
                        Your cart is empty!
                      </h5>
                      <p className="text-muted mb-3">
                        Looks like you haven’t added anything yet. Start
                        exploring and find something you’ll love!
                      </p>
                      <Link
                        to="/products/all"
                        className="btn btn-dark rounded-pill px-4 py-2 mt-2"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  )}

                  {!loading && !error && cartItems.length > 0 && (
                    <>
                      <div className="container">
                        <div className="row gy-5 mt-4">
                          <div className="col-12 col-lg-7 pe-lg-4">
                            <h3
                              className="mt-5 mb-5 bag-title"
                              style={{ marginLeft: "20%" }}
                            >
                              Bag
                            </h3>

                            {cartItems.map((prd, index) => {
                              return (
                                <>
                                  <div
                                    className="mb-4 mt-4 mx-auto"
                                    style={{ maxWidth: "540px" }}
                                  >
                                    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center justify-content-md-start gap-4 text-center text-md-start">
                                      <div className="">
                                        <Link
                                          to={`/product/${prd.productId._id}`}
                                        >
                                          <img
                                            src={prd.productId.thumbnail}
                                            alt="..."
                                            className="rounded"
                                            style={{
                                              width: "150px",
                                              height: "150px",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </Link>
                                        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mt-3 flex-wrap">
                                          <button
                                            className="btn btn-secondary"
                                            onClick={() => decreaseQty(prd._id)}
                                          >
                                            <i className="bi bi-dash fs-6"></i>
                                          </button>

                                          <p>{prd.quantity}</p>

                                          <button
                                            className="btn btn-secondary"
                                            onClick={() => addQty(prd._id)}
                                          >
                                            <i className="bi bi-plus fd-6"></i>
                                          </button>
                                        </div>
                                      </div>
                                      <div className="">
                                        <div className="">
                                          <h5 className="card-title">
                                            {prd.productId.name}
                                          </h5>
                                          <h6 className="text-secondary mt-2 fw-light">
                                            {prd.productId.gender}'s{" "}
                                            {prd.productId.category}
                                          </h6>

                                          <div className="d-flex align-items-baseline gap-3 mt-3 price">
                                            <h5 className="">
                                              ₹ {prd.productId.price}
                                            </h5>

                                            {prd.productId.discountPercent >
                                              0 && (
                                              <small className=" text-secondary fw-light">
                                                MRP : {prd.productId.mrp}
                                              </small>
                                            )}
                                          </div>

                                          <div className="d-flex align-items-baseline gap-3">
                                            <button
                                              onClick={() =>
                                                wishlistHandler(
                                                  prd.productId._id
                                                )
                                              }
                                              className="btn btn-dark mt-3"
                                            >
                                              Favourite 🤍
                                            </button>

                                            <button
                                              className="btn btn-secondary  ms-2"
                                              onClick={(e) =>
                                                deleteCartItem(prd._id)
                                              }
                                            >
                                              <i className="bi bi-trash fs-6"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>

                          <div className="col-12 col-lg-5 mt-5">
                            <div>
                              <h3 className="mt-5">Summary</h3>
                              <div className="d-flex justify-content-between align-items-center mt-5">
                                <h6>Subtotal</h6>
                                <p>₹ {totalPrice}</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <h6>Shipping Costs</h6>
                                <p>Free</p>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold">Grand Total</h6>
                                <p className="fw-bold">₹ {totalPrice}</p>
                              </div>
                              <div className="text-center mt-4">
                                <Link to="/checkout">
                                  <button className="btn btn-dark rounded-pill py-3 px-5 fw-medium w-100 w-md-50">
                                    Checkout
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Cart;
