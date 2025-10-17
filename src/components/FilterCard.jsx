import { Link } from "react-router-dom";
import Filter from "./Filter";
import { useContext } from "react";
import NextStepContext from "../context/NextStepContext";

const FilterCard = ({ data }) => {
  const { setShow } = useContext(NextStepContext);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-md-12">
          <div className="row g-4">
            {data.map(
              (
                {
                  name,
                  category,
                  gender,
                  price,
                  mrp,
                  discountPercent,
                  thumbnail,
                  _id,
                  colors,
                  rating,
                },
                index
              ) => (
                <div className="col-6 col-md-6 col-lg-4" key={index}>
                  <Link
                    to={`/product/${_id}`}
                    className="text-decoration-none text-reset"
                    onClick={setShow(false)}
                  >
                    <div className="position-relative">
                      <div className="ratio ratio-4x3">
                        <img
                          src={thumbnail}
                          alt={name}
                          className="w-100 h-100 object-fit-cover rounded-3 category-img"
                        />
                      </div>
                      <div className="p-3">
                        <h5 className="mt-3 mb-2">{name}</h5>
                        <h6 className="text-secondary fw-light">
                          {gender}'s {category}
                        </h6>
                        <p className="text-secondary fw-light mb-2">
                          Colors{" "}
                          {Array.isArray(colors)
                            ? colors.length
                            : colors && typeof colors === "object"
                            ? Object.keys(colors).length
                            : 0}
                        </p>

                        <div className="d-flex align-items-baseline gap-3 mt-3 ">
                          <h5 className="">₹ {price}</h5>
                          <h6 className="text-secondary fw-light">
                            MRP: ₹{mrp}
                          </h6>
                          
                        </div>

                        {discountPercent > 0 && (
                          <span className=" badge-discount position-absolute top-0 start-0 mt-1 ms-1 px-2 py-1 bg-black text-white small fw-semibold rounded-1">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
