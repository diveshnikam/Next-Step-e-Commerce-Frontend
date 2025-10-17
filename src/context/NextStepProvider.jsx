import { useState } from "react";
import NextStepContext from "./NextStepContext";


const NextStepProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState([]);
  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState([]);
  const [cartCount, setCartCount] = useState("");
  const [wishlistCount, setWishlistCount] = useState("");

  const refreshCounts = () => {
  
  fetch("https://next-step-ecommerce-backend.vercel.app/products/cart")
    .then((res) => res.json())
    .then((data) => setCartCount(data.length))
    .catch((err) => console.error("Error fetching cart count:", err));

  
  fetch("https://next-step-ecommerce-backend.vercel.app/products/wishlist")
    .then((res) => res.json())
    .then((data) => setWishlistCount(data.length))
    .catch((err) => console.error("Error fetching wishlist count:", err));
};

 
  

  return (
    <NextStepContext.Provider
      value={{
        search,
        setSearch,
        show,
        setShow,
        gender,
        setGender,
        rating,
        setRating,
        discount,
        setDiscount,
        price,
        setPrice,
        color,
        setColor,
        cartCount,
        setCartCount,
        wishlistCount,
        setWishlistCount,
        refreshCounts
      }}
    >
      {children}
    </NextStepContext.Provider>
  );
};

export default NextStepProvider;
