import { useParams, useLocation } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import NextStepContext from "../context/NextStepContext";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import FilterCard from "../components/FilterCard";
import Filter from "../components/Filter";
import Footer from "../components/Footer";

const Products = () => {
  const { category } = useParams();

  const {
    gender,
    show,
    setShow,
    setSearch,
    setGender,
    rating,
    setRating,
    discount,
    setDiscount,
    price,
    setPrice,
    color,
    setColor,
  } = useContext(NextStepContext);

  const location = useLocation();

  useEffect(() => {
    setSearch("");
    setShow(false);
  }, [category]);

  let url = "";
  if (category === "All") {
    url = `https://next-step-ecommerce-backend.vercel.app/shoes`;
  } else {
    url = `https://next-step-ecommerce-backend.vercel.app/shoes/category/${category}`;
  }

  const params = new URLSearchParams();

  if (gender && gender.length > 0) {
    params.append("gender", gender.join(","));
  }

  if (rating) {
    params.append("rating", rating);
  }

  if (category && category !== "All") {
    params.append("category", category);
  }

  if (discount) {
    params.append("discount", discount);
  }

  if (price) {
    params.append("sort", price);
  }

  if (color) {
    params.append("color", color);
  }

  if (params.toString()) {
    url = `https://next-step-ecommerce-backend.vercel.app/products/filter?${params.toString()}`;
  }

  useEffect(() => {
    setGender([]);
    setRating("");
    setDiscount("");
    setPrice("");
    setColor("");
  }, [location.pathname]);

  const { data, loading, error, notFound } = useFetch(url, []);

  return (
    <>
      {show ? (
        <>
          <div className="">
            <Header />
          </div>

          <Search />
        </>
      ) : (
        <>
          <div className="d-flex flex-column min-vh-100 bg-white">
            <div className="sticky-top">
              <Header />
            </div>

            <main className="flex-grow-1">
              <div className="container">
                <div className="row g-5">
                  <div className="col-12 col-xl-2 col-md-3 mt-5">
                    <div
                      className="position-sticky"
                      style={{
                        top: "90px",
                        maxHeight: "calc(100vh - 100px)",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                      }}
                    >
                      <Filter />
                    </div>
                  </div>

                  <div className="col-12 col-xl-10 col-md-9">
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

                    {!loading && error && !notFound && (
                      <div className="alert container alert-danger mt-5 text-center">
                        Failed to load. Please try again.
                      </div>
                    )}

                    {!loading && notFound && !error && (
                      <div className="text-center mt-5 py-5 px-4">
                        <i className="bi bi-funnel text-warning fs-1 mb-3 d-block"></i>
                        <h5 className="fw-semibold text-dark mb-2">
                          No products found
                        </h5>
                        <p className="text-muted mb-0">
                          Try adjusting your filters or explore other categories
                          to find what you like.
                        </p>
                      </div>
                    )}

                    {!loading &&
                      !error &&
                      data.length === 0 &&
                      !notFound === 0 && (
                        <div className="alert alert-danger mt-5 text-center container">
                          No Products available.
                        </div>
                      )}

                    <div>
                      <h5 className="container mt-md-1 mt-lg-4 mb-5">
                        {category} Shoes ({data.length})
                      </h5>
                    </div>

                    {!loading && !error && data.length > 0 && (
                      <>
                        <FilterCard data={data} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </main>

            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Products;
