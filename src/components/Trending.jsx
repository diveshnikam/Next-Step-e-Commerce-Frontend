import useFetch from "../customHooks/useFetchSearch";
import { Link } from "react-router-dom";
import Card from "./Card";

const Trending = () => {
  const { data, loading, error } = useFetch(
    "https://next-step-ecommerce-backend.vercel.app/homepage?trendingLimit=6"
  );

  const trending = data?.data?.trending ?? [];

  return (
    <div className="container mt-5">
      <h1 className="bg-black text-white text-center rounded p-3">Trending</h1>

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
        <div className="alert alert-danger mt-5 text-center container" role="alert">
          Failed to load Trending. Please try again.
        </div>
      )}

      {!loading && !error && trending.length === 0 && (
        <div className="alert alert-danger mt-5 text-center  container">No Trending available.</div>
      )}

      {!loading && !error && trending.length > 0 && (
        <>
        <Card data={trending} />
        </>
      )}
    </div>
  );
};

export default Trending;
