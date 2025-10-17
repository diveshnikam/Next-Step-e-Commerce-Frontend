import { NavLink } from "react-router-dom";
import NextStepContext from "../context/NextStepContext";
import { useContext, useEffect } from "react";

const Header = () => {
  const { setSearch, search, setShow, cartCount, refreshCounts } =
    useContext(NextStepContext);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    refreshCounts();
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-white container ">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src="https://res.cloudinary.com/di71zb4sb/image/upload/v1759339075/logo_white_tkbxgd.png"
              alt="Logo"
              className="img-fluid"
              style={{ height: "60px", objectFit: "contain" }}
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto  gap-3 gap-lg-5">
              <li className="nav-item">
                <NavLink
                  to="/products/all"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-black"
                      : " nav-link fw-semibold text-black hover-underline"
                  }
                >
                  Explore All
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products/Lifestyle"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-black"
                      : "fw-semibold nav-link text-black hover-underline "
                  }
                >
                  Lifestyle
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products/Running"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-black"
                      : "fw-semibold nav-link text-black hover-underline"
                  }
                >
                  Running
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products/Training"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-black"
                      : " fw-semibold nav-link text-black hover-underline"
                  }
                >
                  Training
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/products/Jordan"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-black"
                      : "fw-semibold nav-link text-black hover-underline"
                  }
                >
                  Jordan
                </NavLink>
              </li>
            </ul>
            <div className="d-flex ms-auto align-items-center mt-3 mt-lg-0 mb-2 mb-lg-0">
              <form
                className="d-flex me-3"
                role="search"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="form-control w-100 bg-body-tertiary rounded-pill shadow-none no-focus-border"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={handleSearchChange}
                  style={{
                    background:
                      "url('https://cdn-icons-png.flaticon.com/512/54/54481.png') no-repeat 12px center",
                    backgroundSize: "16px",
                    paddingLeft: "40px",
                  }}
                />
              </form>

              <NavLink
                to="/wishlist"
                className="nav-link ms-2 p-2 rounded-circle wishlist-hover"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                  alt="wishlist"
                  style={{ width: "24px", height: "24px" }}
                />
              </NavLink>

              <NavLink
                to="/cart"
                className="nav-link position-relative ms-2 p-2 rounded-circle cart-hover"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                  alt="cart"
                  style={{ width: "24px", height: "24px" }}
                />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/userprofile"
                className="nav-link ms-2 p-2 rounded-circle profile-hover"
              >
                <img
                  src="https://res.cloudinary.com/di71zb4sb/image/upload/v1759349571/Screenshot_2025-10-02_at_1.42.32_AM_rwmaxt.png"
                  alt="profile"
                  style={{ width: "24px", height: "24px" }}
                  className="img-fluid"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
