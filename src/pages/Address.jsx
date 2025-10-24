import Search from "../components/Search";
import Header from "../components/Header";
import NextStepContext from "../context/NextStepContext";
import { useContext } from "react";
import AddAddress from "../components/AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";



const Address = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fromCheckout =
    new URLSearchParams(location.search).get("from") === "checkout";

  const { show } = useContext(NextStepContext);

  return (
    <>
      {show ? (
        <>
          <Header />
          <Search />
        </>
      ) : (
        <>
        <div
        className="d-flex flex-column min-vh-100"
      >

      
          <Header />
          <main className="flex-grow-1">

         
          {fromCheckout && (
            <div className="text-center mt-3">
              <button
                className="btn btn-outline-dark rounded-pill px-4 py-2"
                onClick={() => navigate("/checkout")}
              >
                ← Back to Checkout
              </button>
            </div>
          )}

          <AddAddress />

           </main>

          <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Address;
