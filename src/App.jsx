import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Category from "./components/category";
import HotDeals from "./components/HotDeals";
import Trending from "./components/Trending";
import Footer from "./components/Footer";
import Search from "./components/Search";
import "./App.css";
import NextStepContext from "./context/NextStepContext";
import { useContext } from "react";
import SearchCleaner from "./components/SearchCleaner";

function App() {
  const { show } = useContext(NextStepContext);

  return (
    <>
      <Header />
      {show ? (
        <Search />
      ) : (
        <>
          <Search />
          <div>
            <Link to="/products/all" className="">
              <img
                src="https://res.cloudinary.com/di71zb4sb/image/upload/v1759355976/ChatGPT_Image_Sep_27_2025_at_01_51_34_PM_fd3wr3.png"
                alt="hero banner image"
                className="img-fluid object-fit-cover"
                style={{ width: "100%", maxHeight: "900px" }}
              />
            </Link>
          </div>
          <Category />
          <HotDeals />
          <Trending />
          <SearchCleaner />

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
