import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NextStepContext from "../context/NextStepContext";
import useFetchSimilar from "../customHooks/useFetchSimilar";
import Search from "../components/Search";
import { Link } from "react-router-dom";

const Orders = () => {
  const { show } = useContext(NextStepContext);

  const [orderData, setOrderData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [pageInput, setPageInput] = useState();

  const [errorMsg, setErrorMsg] = useState(false);

  const ordersPerPage = 5;

  const totalPages = Math.ceil(orderData.length / ordersPerPage);
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = orderData.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const { productData, loading, error } = useFetchSimilar(
    "https://next-step-ecommerce-backend.vercel.app/products/orders"
  );

  useEffect(() => {
    if (productData) {
      setOrderData(productData);
    }
  }, [productData]);

  return (
    <>
      {show ? (
        <>
          <Header />
          <Search />
        </>
      ) : (
        <>
          <Header />
          <div className="d-flex flex-column min-vh-100">
            <div className="flex-grow-1">
              {loading && !error && (
                <div className="text-center my-5 d-flex justify-content-center align-items-center min-vh-100 ">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {error && !loading && (
                <div className="text-center my-5 d-flex justify-content-center align-items-center min-vh-100">
                  <div>
                    <i className="bi bi-exclamation-triangle-fill text-black fs-1"></i>
                    <p className="mt-3 fw-semibold text-black">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                </div>
              )}

              {orderData.length === 0 && !loading && !error && (
                <div className="text-center my-5 d-flex justify-content-center align-items-center min-vh-100">
                  <div>
                    <i className="bi bi-bag-x text-secondary fs-1"></i>
                    <h5 className="fw-semibold text-muted mb-3 mt-3">
                      No orders found
                    </h5>
                    <p className="text-secondary mb-4">
                      You haven’t placed any orders yet.
                    </p>

                    <Link
                      to="/"
                      className="btn btn-dark px-4 py-2 rounded-pill"
                    >
                      <i className="bi bi-bag me-2"></i> Continue Shopping
                    </Link>
                  </div>
                </div>
              )}

              <div className="">
                {orderData.length > 0 && !loading && !error && (
                  <div className="container mt-5">
                    <h2 className="mt-5">Orders</h2>

                    {currentOrders.map((ord, index) => {
                      return (
                        <div
                          className="card p-3 mb-3 mt-5 shadow mx-auto card-hover "
                          key={index}
                          style={{ maxWidth: "740px" }}
                        >
                          <div className="row g-0">
                            <div className="col-md-4">
                              <img
                                src={ord.productId.thumbnail}
                                className="img-fluid rounded-start"
                                alt={ord.productId.name}
                                style={{
                                  height: "170px",
                                  width: "100%",
                                  objectFit: "cover",
                                  borderRadius: "0.25rem 0 0 0.25rem",
                                }}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="card-title">
                                  {ord.productId.name}
                                </h5>
                                <h6 className="mt-3 mb-3">
                                  Quantity: {ord.quantity}
                                </h6>
                                <h6 className="">
                                  Price: ₹{ord.productId.price}
                                </h6>

                                <p className="card-text mt-3 ">
                                  <small className="text-muted">
                                    Ordered on{" "}
                                    {new Date(ord.orderDate).toLocaleDateString(
                                      "en-IN",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )}
                                  </small>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

             <div className="d-flex flex-wrap justify-content-center align-items-center text-center gap-3 mt-5 mb-5">

                <button
                  className="btn btn-dark"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                <span>
                  <b>Page</b> {currentPage} <b>of</b> {totalPages}
                </span>

                <button
                  className="btn btn-dark"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>

                <input
                  id="pageInput"
                  type="text"
                  value={pageInput}
                  placeholder="Enter page no"
                  min="1"
                  max={totalPages}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPageInput(value);

                    if (value === "") {
                      setCurrentPage(1);
                      setErrorMsg(false);
                      return;
                    }

                    

                    

                    const num = Number(value);

                    if (num >= 1 && num <= totalPages) {
                      setCurrentPage(num);
                      setErrorMsg(false);
                    } else {
                      setErrorMsg(true);
                    }
                  }}
                  className="form-control text-center fw-semibold ms-3 "
                  style={{
                    maxWidth: "200px",
                    borderRadius: "50px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #dee2e6",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                    padding: "8px 14px",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) =>
                    (e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.25)")
                  }
                  onBlur={(e) =>
                    (e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.08)")
                  }
                />
              </div>
              {errorMsg && (
                <>
                  <div
                    class="alert alert-danger container text-center"
                    role="alert"
                  >
                    Please enter a page between 1 - {totalPages}
                  </div>
                </>
              )}
            </div>

            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
