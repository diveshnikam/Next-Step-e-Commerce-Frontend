import { useState, useEffect } from "react";
import useFetchSimilar from "../customHooks/useFetchSimilar";
import Footer from "./Footer";

const AddAddress = () => {
  const [formData, setFormData] = useState({
    name: "",
    pincode: "",
    street: "",
    city: "",
    state: "",
    country: "",
  });

  const [nameError, setNameError] = useState(false);
  const [pincodeError, setPincodeError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [countryError, setCountryError] = useState(false);

  const onlyText = /^[A-Za-z\s]+$/;
  const onlyDigits = /^[0-9]+$/;

  const [addresses, setAddresses] = useState([]);

  const [success, setSuccess] = useState(false);

  const [deleteMsg, setDeleteMsg] = useState(false);

  const [editId, setEditId] = useState(null);

  const [editMsg, setEditMsg] = useState(false);

  const { productData, loading, error } = useFetchSimilar(
    "https://next-step-ecommerce-backend.vercel.app/addresses"
  );

  useEffect(() => {
    if (productData) {
      setAddresses(productData);
    }
  }, [productData]);

  const deleteHandler = (id) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    switch (name) {
      case "name":
        if (!onlyText.test(value) || value.trim().length < 3) {
          setNameError(true);
        } else {
          setNameError(false);
        }
        break;

      case "street":
        if (value.trim().length < 5) {
          setStreetError(true);
        } else {
          setStreetError(false);
        }
        break;

      case "city":
        if (!onlyText.test(value) || value.trim().length < 3) {
          setCityError(true);
        } else {
          setCityError(false);
        }
        break;

      case "state":
        if (!onlyText.test(value) || value.trim().length < 3) {
          setStateError(true);
        } else {
          setStateError(false);
        }
        break;

      case "country":
        if (!onlyText.test(value) || value.trim().length < 3) {
          setCountryError(true);
        } else {
          setCountryError(false);
        }
        break;

      case "pincode":
        if (!onlyDigits.test(value) || value.length !== 6) {
          setPincodeError(true);
        } else {
          setPincodeError(false);
        }
        break;

      default:
        break;
    }
  };

  const disableSubmit =
    nameError ||
    streetError ||
    cityError ||
    stateError ||
    countryError ||
    pincodeError ||
    Object.values(formData).some((val) => val.trim() === "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editId
      ? `https://next-step-ecommerce-backend.vercel.app/addresses/${editId}`
      : `https://next-step-ecommerce-backend.vercel.app/addresses`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editId) {
          setAddresses((prev) =>
            prev.map((addr) => (addr._id === editId ? data : addr))
          );
          setEditId(null);
          setEditMsg(true);
          setTimeout(() => setEditMsg(false), 3000);
        }
        if (!editId) {
          setAddresses((prev) => [...prev, data]);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }
        setFormData({
          name: "",
          pincode: "",
          street: "",
          city: "",
          state: "",
          country: "",
        });
      });
  };

  const handleDelete = (id) => {
    fetch(`https://next-step-ecommerce-backend.vercel.app/addresses/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setAddresses((prev) => prev.filter((a) => a._id !== id));

        setDeleteMsg(true);
        setTimeout(() => setDeleteMsg(false), 3000);
      })
      .catch((err) => console.error("Error deleting address:", err));
  };

  const editHandler = (id) => {
    const addressToEdit = addresses.find((a) => a._id === id);
    if (addressToEdit) {
      setFormData({
        name: addressToEdit.name,
        pincode: addressToEdit.pincode,
        street: addressToEdit.street,
        city: addressToEdit.city,
        state: addressToEdit.state,
        country: addressToEdit.country,
      });
      setEditId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {editMsg && (
        <div className="text-center mt-5 py-4 fade-in">
          <i className="bi bi-pencil-square text-primary fs-1 mb-3 d-block"></i>
          <h5 className="text-dark fw-semibold">
            Address updated successfully!
          </h5>
        </div>
      )}
      {deleteMsg && (
        <div className="text-center mt-5 py-4 fade-in">
          <i className="bi bi-trash-fill text-dark fs-1 mb-3 d-block"></i>
          <h5 className="text-dark fw-semibold">
            Address deleted successfully!
          </h5>
        </div>
      )}

      {success && (
        <div className="text-center mt-5 py-4 fade-in">
          <i className="bi bi-check-circle-fill text-success fs-1 mb-3 d-block"></i>
          <h5 className="text-dark fw-semibold">Address saved successfully!</h5>
        </div>
      )}

      <h2 className="mt-5 container">Manage Address</h2>

      <div className="row">
        <div className="col-md-6">
          <form
            onSubmit={handleSubmit}
            className="container mt-5 bg-white shadow rounded-5 p-5"
            style={{
              maxWidth: "600px",
              width: "90%",
              margin: "0 auto",
            }}
          >
            <div className="mb-3">
              <label className="form-label"></label>
              <input
                type="text"
                name="name"
                className={`form-control ${
                  nameError ? "is-invalid-field" : ""
                } mb-2`}
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              {nameError && (
                <small className="text-danger">
                  Only letters allowed, minimum 3 characters
                </small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label"></label>
              <input
                type="text"
                name="street"
                className={`form-control ${
                  streetError ? "is-invalid-field" : ""
                } mb-2`}
                placeholder="Street Address"
                value={formData.street}
                onChange={handleChange}
                required
              />

              {streetError && (
                <small className="text-danger">
                  Street must be at least 5 characters
                </small>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label"></label>
                <input
                  type="text"
                  name="city"
                  className={`form-control ${
                    cityError ? "is-invalid-field" : ""
                  } mb-2`}
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                {cityError && (
                  <small className="text-danger">
                    Only letters allowed, minimum 3 characters
                  </small>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"></label>
                <input
                  type="text"
                  name="state"
                  className={`form-control ${
                    stateError ? "is-invalid-field" : ""
                  } mb-2`}
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                {stateError && (
                  <small className="text-danger">
                    Only letters allowed, minimum 3 characters
                  </small>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label"></label>
                <input
                  type="text"
                  name="pincode"
                  className={`form-control ${
                    pincodeError ? "is-invalid-field" : ""
                  } mb-2`}
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
                {pincodeError && (
                  <small className="text-danger">
                    Only numbers allowed — must be exactly 6 digits
                  </small>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"></label>
                <input
                  type="text"
                  name="country"
                  className={`form-control ${
                    countryError ? "is-invalid-field" : ""
                  } mb-2`}
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
                {countryError && (
                  <small className="text-danger">
                    Only letters allowed, minimum 3 characters
                  </small>
                )}
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={disableSubmit}
                className="btn btn-dark w-50 text-center rounded-4 py-2 mt-3"
              >
                {editId ? "Update Address" : "Save Address"}
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6">
          {loading && !error && (
            <div className="text-center mt-5">
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
            <div className="container">
              <div className="text-center">
                <h5 className="fw-bold">
                  <i className="bi bi-exclamation-triangle-fill text-dark me-2"></i>
                  Failed to load Address. Please try again.
                </h5>
              </div>
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

          {!loading && !error && addresses.length > 0 && (
            <div className="container mt-4">
              <div className="d-flex flex-column align-items-center gap-3">
                {addresses.map((add, index) => (
                  <div
                    key={index}
                    className="w-100 bg-white shadow rounded-4 p-4 mt-3 mb-3"
                    style={{
                      maxWidth: "600px",
                      width: "90%",
                      margin: "0 auto",
                    }}
                  >
                    <h5 className="fw-semibold mb-2">{add.name}</h5>
                    <p className="mb-1 text-muted">
                      {add.street}, {add.city}, {add.state}
                    </p>
                    <p className="mb-0 text-muted">
                      {add.pincode}, {add.country}
                    </p>

                    <div className="d-flex mt-3 justify-content-center gap-3 flex-wrap">
                      <button
                        className="btn btn-outline-dark rounded-4 py-2 px-4"
                        onClick={() => handleDelete(add._id)}
                      >
                        <i className="bi bi-trash me-2"></i> Delete
                      </button>
                      <button
                        className="btn btn-dark rounded-4 py-2 px-4"
                        onClick={() => editHandler(add._id)}
                      >
                        <i className="bi bi-pencil-square me-2"></i> Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div></div>
    </>
  );
};

export default AddAddress;
