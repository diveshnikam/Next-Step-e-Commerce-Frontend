import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = {
    name: "Divesh Nikam",
    email: "divesh.nikam@gmail.com",
    phone: "+91 7798734499",
    address: "Kasba Bawada, Kolhapur, Maharashtra, 416006",
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      
      <div className="flex-grow-1">
        <div className="container my-5">
          <div className="card shadow border-0 mx-auto" style={{ maxWidth: "700px" }}>
            <div className="card-body p-4">
              <h3 className="text-center mb-4 fw-semibold">My Profile</h3>

             
              <div className="mb-4">
                <h5 className="fw-semibold">Personal Details</h5>
                <hr />
                <p className="mb-2"><strong>Name:</strong> {user.name}</p>
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
                <p className="mb-0"><strong>Address:</strong> {user.address}</p>
              </div>

             
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4">
                <Link to="/address" className="btn  rounded-pill px-4 py-2 w-100 w-md-auto">
                  <i className="bi bi-house-add me-2"></i> Add New Address
                </Link>

                <Link to="/orders" className="btn  rounded-pill px-4 py-2 w-100 w-md-auto">
                  <i className="bi bi-bag-check me-2"></i> View Order History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default UserProfile;
