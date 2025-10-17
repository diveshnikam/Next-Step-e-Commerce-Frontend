import AddAddress from "../components/AddAddress";
import Search from "../components/Search";
import Header from "../components/Header";
import NextStepContext from "../context/NextStepContext";
import { useContext, useState, useEffect } from "react";
import useFetchSimilar from "../customHooks/useFetchSimilar";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [dataCart, setDataCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [alertAddress, setALertAddress] = useState(false);
  const [orderAlert, setOrderAlert] = useState(false);

  const { show } = useContext(NextStepContext);

  const { productData, loading, error } = useFetchSimilar(
    "https://next-step-ecommerce-backend.vercel.app/addresses"
  );

  const {
    productData: cartData,
    loading: loadingCart,
    error: cartError,
  } = useFetchSimilar(
    "https://next-step-ecommerce-backend.vercel.app/products/cart"
  );

  useEffect(() => {
    if (productData) {
      setAddresses(productData);
    }
  }, [productData]);

  useEffect(() => {
    if (cartData) {
      setDataCart(cartData);
    }
  }, [cartData]);

  useEffect(() => {
    const totalAmount = cartData.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cartData]);

  const placeOrder = async (id) => {
    if (!selectedAddress) {
      setALertAddress(true);

      setTimeout(() => {
        setALertAddress(false);
      }, 3000);

      return;
    }

    if (dataCart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    for (const item of dataCart) {
      await fetch(
        `https://next-step-ecommerce-backend.vercel.app/products/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: item.productId._id,
            quantity: item.quantity,
          }),
        }
      )
        .then((res) => {
          if (!res.ok) {
            console.log(
              `Error placing order for: ${item.productId.name} — Status: ${res.status} (${res.statusText})`
            );

            return;
          }
          return res.json();
        })
        .catch((err) => {
          console.log(`Order error for ${item.productId.name}:`, err);
          return;
        });
    }

    for (const item of dataCart) {
      await fetch(
        `https://next-step-ecommerce-backend.vercel.app/products/cart/${item._id}`,
        { method: "DELETE" }
      )
        .then((res) => {
          if (!res.ok) {
            console.log(
              `Error : ${item.productId.name} — Status: ${res.status} (${res.statusText})`
            );

            return;
          }
          return res.json();
        })
        .catch((err) => {
          console.log(`error ${item.productId.name}:`, err);
          return;
        });
    }

    setOrderAlert(true);
    setDataCart([]);
    setSelectedAddress(null);
    setTotal(0);
  };

  return (
    <>
      {show ? (
        <>
          <Header />
          <Search></Search>
        </>
      ) : (
        <>
          <Header />

          {orderAlert ? (
            <div className="text-center mt-5 py-5 px-4 rounded-4 shadow-sm bg-light">
              <i className="bi bi-bag-check-fill text-dark fs-1 mb-3 d-block"></i>
              <h4 className="fw-bold text-dark mb-2">
                Order Placed Successfully!
              </h4>
              <p className="text-muted mb-4">
                🎉 Thank you for shopping with{" "}
                <span className="fw-semibold">Next Step</span>. Your order has
                been confirmed and will be delivered soon.
              </p>
              <Link
                to="/products/all"
                className="btn btn-white rounded-pill px-4 py-2 fw-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
 
             <div className="container mt-5">

                         

              

                

                <div className="d-flex justify-content-center" >

                  

                  <div className="">

                   
                  <div className="text-center">

                     <h2>Checkout</h2>

                  </div>
                  

                        

                    
                   
                    

                     {!loading && !error && addresses.length > 0 && (
                  <>
                  <h4 className="mt-5 mb-5">Select Delivery Address</h4>
                    {addresses.map((addr, index) => {
                      return (
                        <div
                          key={index}
                          className={`border rounded-3 p-4 mb-3     ${
                            selectedAddress === addr._id ? "border-dark" : ""
                          }`}
                          onClick={() => setSelectedAddress(addr._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <h6 className="fw-semibold mb-1">{addr.name}</h6>
                          <p className="mb-0 text-muted">
                            {addr.street}, {addr.city}, {addr.state},{" "}
                            {addr.country} - {addr.pincode}
                          </p>
                        </div>
                      );
                    })}
                    <div className="">

                        <Link
                      to="/address?from=checkout"
                      className="btn btn-dark rounded px-3 mt-2"
                    >
                      Add / Edit Address
                    </Link>

                    </div>

                    <div className="">

                      {!loadingCart && !cartError && cartData.length > 0 && (
                  <>
                    <div className="bg-white  p-4 mt-5 ">
                      <h5 className="fw-semibold mb-3">Order Summary</h5>
                      {cartData.map((item) => (
                        <div
                          key={item._id}
                          className="d-flex justify-content-between mb-2"
                        >
                          <span>{item.productId.name}</span>
                          <span>
                            ₹{item.productId.price} × {item.quantity}
                          </span>
                        </div>
                      ))}
                      <hr />
                      <div className="d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>

                      <div className="d-flex justify-content-end mt-4">
                        <button
                          onClick={placeOrder}
                          className="btn btn-dark  p-2 rounded"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                    
                    
                  </>
                )}

                    </div>
                    
                  </>
                )}

                  </div>

                 

                </div>

                

                {alertAddress && (
                  <div className="text-center mt-4 py-4 px-3">
                    <i className="bi bi-geo-alt text-warning fs-1 mb-3 d-block"></i>
                    <h5 className="fw-semibold text-dark mb-2">
                      No Address Selected
                    </h5>
                    <p className="text-muted mb-3">
                      Please select a delivery address before placing your order
                      🚚
                    </p>
                  </div>
                )}

                {loading && !error && (
                  <div className="text-center my-5">
                    <div className="spinner-border text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading Addresses...</p>
                  </div>
                )}

                {!loading && error && (
                  <div
                    className="alert alert-danger mt-5 text-center container"
                    role="alert"
                  >
                    Failed to load Address. Please try again.
                  </div>
                )}

                {!loading && !error && addresses.length === 0 && (
                  <div className="text-center mt-5 py-4 ">
                    <i className="bi bi-geo-alt text-secondary fs-1 mb-3 d-block"></i>
                    <h5 className="text-dark fw-semibold">
                      No saved addresses found
                    </h5>
                    <p className="text-muted mb-0">
                      Add your first address to get started 🏠
                    </p>
                  </div>
                )}

               

                {loadingCart && !cartError && (
                  <div className="text-center my-5">
                    <div className="spinner-border text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading Cart Summary...</p>
                  </div>
                )}

                {!loadingCart && cartError && (
                  <div
                    className="alert alert-danger mt-5 text-center container"
                    role="alert"
                  >
                    Failed to load Order Summary. Please try again.
                  </div>
                )}

                {!loadingCart && !cartError && dataCart.length === 0 && (
                  <div className="text-center mt-5 py-4 ">
                    <i className="bi bi-geo-alt text-secondary fs-1 mb-3 d-block"></i>
                    <h5 className="text-dark fw-semibold">Cart is Empty!</h5>
                    <p className="text-muted mb-3">
                      Looks like you haven’t added anything yet. Start exploring
                      and find something you’ll love!
                    </p>
                    <Link
                      to="/products/all"
                      className="btn btn-dark rounded-pill px-4 py-2 mt-2"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )}

                
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Checkout;
