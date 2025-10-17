import { useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Search from "../components/Search";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import NextStepContext from "../context/NextStepContext";
import { useState, useEffect } from "react";
import ProductImageDeatils from "../components/ProductImagesDeatils";

const ProductsDetails = () => {
  

  const { id } = useParams();

  const { show } = useContext(NextStepContext);

  const { data, loading, error, notFound } = useFetch(
    `https://next-step-ecommerce-backend.vercel.app/shoe/id/${id}`
  );



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
                <div className="alert alert-danger mt-5 text-center" role="alert">
                  Failed to load. Please try again.
                </div>
              )}



          {!loading && !error && !data && (
            <div className="alert alert-danger mt-4 text-center">
              No Product available.
            </div>
          )}

          {!loading && !error && data && (
            <>
                <div className="container mt-5">

                      <ProductImageDeatils data = {data} />

                </div>

            </>
          )}

          <Footer />
        </>
      )}
    </>
  );
};

export default ProductsDetails;
