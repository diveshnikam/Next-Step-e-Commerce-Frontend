import useFetch from "../customHooks/useFetchSearch";
import { Link } from "react-router-dom";
import Card from "./Card";

const HotDeals = () => {
  const { data, loading, error } = useFetch(
    "https://next-step-ecommerce-backend.vercel.app/homepage?hotLimit=6"
  );

  const hotDeals = data?.data?.hotDeals ?? [];

  return (
    <div className="container mt-5">
      <h1 className="bg-black text-white text-center rounded p-3">Hot Deals</h1>

      {loading && !error && (
        <div className="d-flex justify-content-center py-5">
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
          Failed to load Hot Deals. Please try again.
        </div>
      )}

      {!loading && !error && hotDeals.length === 0 && (
        <div className="alert alert-danger mt-5 text-center">No hot deals available.</div>
      )}

      {!loading && !error && hotDeals.length > 0 && (
       <>
       <Card data={hotDeals} />
       </>
      )}
    </div>
  );
};

export default HotDeals;
