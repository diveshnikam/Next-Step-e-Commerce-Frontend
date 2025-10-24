import { useState, useEffect } from "react";
import Rating from "./Rating";
import FilterToggle from "./FilterToggle";
import Sizes from "./Sizes";
import Discription from "./Discription";
import Features from "./Features";
import Cod from "./Cod";
import Similar from "./Similar";
import useWishlistStatus from "../customHooks/useWishlistStatus";
import { useContext } from "react";
import NextStepContext from "../context/NextStepContext";

const ProductImageDetails = ({ data }) => {
  const [mainImage, setMainImage] = useState(null);
  const [color, setColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [cartAdded, setCartAdded] = useState(false);
  const [sizeAlert, setSizeAlert] = useState(false);

  useEffect(() => {
    if (data && data.colors) {
      const firstColor = Object.keys(data.colors)[0];
      const firstImage = data.colors[firstColor][0];
      setMainImage(firstImage);
      setColor(firstColor);
    }
  }, [data]);

  const { inWishlist, setInWishlist } = useWishlistStatus(data._id);
  const { cartItems, setCartItems, refreshCounts } =
    useContext(NextStepContext);

  const wishlistHandler = () => {
    if (inWishlist) {
      fetch(
        "https://next-step-ecommerce-backend.vercel.app/products/wishlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: data._id }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setInWishlist((prev) => !prev);
          refreshCounts();
        })
        .catch((err) => console.error("Error updating wishlist:", err));
    } else if (selectedSize) {
      fetch(
        "https://next-step-ecommerce-backend.vercel.app/products/wishlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: data._id }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setInWishlist((prev) => !prev);
          refreshCounts();
        })
        .catch((err) => console.error("Error updating wishlist:", err));
    } else {
      setSizeAlert(true);
      setTimeout(() => setSizeAlert(false), 3000);
    }
  };

  const cartHandler = () => {
    if (selectedSize) {
      fetch("https://next-step-ecommerce-backend.vercel.app/products/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: data._id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (inWishlist) {
            setInWishlist(false);
          }

          setCartAdded(true);

          refreshCounts();

          setTimeout(() => {
            setCartAdded(false);
          }, 3000);
        })
        .catch((err) => console.error("Error updating wishlist:", err));
    } else {
      setSizeAlert(true);
      setTimeout(() => setSizeAlert(false), 3000);
    }
  };

  return (
    <>
      {data && (
        <div className="container py-4">
          <div className="row">
            <div className="col-md-7 d-flex flex-md-row flex-column-reverse gap-3">
              <div
                className=" mb-4 d-flex flex-md-column flex-row flex-wrap "
                style={{
                  gap: "15px",
                  maxHeight: "500px",
                }}
              >
                {data.colors[color]?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`thumb-${index}`}
                    onMouseEnter={() => setMainImage(img)}
                    className=" thumnail-image"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <div className="">
                <img
                  src={mainImage}
                  alt="main shoe"
                  className="img-fluid shadow-sm rounded"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "auto",
                  }}
                />
              </div>
            </div>

            <div className="col-md-5 mt-4 mt-md-0">
              <div className="">
                <h3 className="mb-2">{data.name}</h3>
                <h5 className="text-muted fw-light mb-0">
                  {data.gender}'s {data.category}
                </h5>
              </div>

              <div className="mt-5">
                <div className="d-flex align-items-baseline gap-3">
                  <h5 className="mb-2">₹ {data.price}</h5>
                  {data.discountPercent > 0 && (
                    <h5 className="text-secondary fw-light">
                      MRP : ₹ {data.mrp}
                    </h5>
                  )}
                </div>
              </div>
              <p className="mb-5">
                <Rating data={data} />
              </p>

              <div className="">
                {Object.keys(data.colors).map((clr, index) => (
                  <img
                    key={index}
                    src={data.colors[clr][0]}
                    alt={clr}
                    className={`thumnail-image me-3`}
                    onMouseEnter={() => {
                      setColor(clr);
                      setMainImage(data.colors[clr][0]);
                    }}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
              <div className="mt-5">
                <Sizes
                  sizes={data.sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              </div>
              <div>
                <Discription description={data.description}></Discription>
                <Features features={data.features}></Features>
                <Cod cod={data.codAvailable}></Cod>
              </div>

              <div className="d-flex flex-column align-items-center gap-3 my-4 mt-5">
                <button
                  onClick={wishlistHandler}
                  className="btn favourite-btn btn-white border border-secondary-subtle rounded-pill py-3 px-5 fw-medium w-75"
                >
                  {inWishlist ? "Favourited 🖤" : "Favourite 🤍"}
                </button>

                <button
                  onClick={cartHandler}
                  className="btn favourite-btn btn-dark border border-secondary-subtle rounded-pill py-3 px-5 fw-medium w-75"
                >
                  Add To Bag
                </button>

                {cartAdded && (
                  <div className="text-center mt-3 mb-3 py-4">
                    <i className="bi bi-bag-check-fill text-success fs-1 mb-3 d-block"></i>
                    <h5 className="text-black">Product added to your Bag 🛍️</h5>
                  </div>
                )}

                {sizeAlert && (
                  <div className="text-center mt-3 mb-3 py-4">
                    <i className="bi bi-exclamation-circle-fill text-dark fs-1 mb-3 d-block"></i>
                    <h6 className="text-black">
                      Please choose your size before adding to the bag or
                      wishlist 💫
                    </h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5">
        <Similar id={data._id} />
      </div>
    </>
  );
};

export default ProductImageDetails;
