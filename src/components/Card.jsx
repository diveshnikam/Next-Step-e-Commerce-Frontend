import { Link } from "react-router-dom"
import { useContext } from "react"
import NextStepContext from "../context/NextStepContext"



const Card = ({data}) => {

    const {setShow} = useContext(NextStepContext)
    return (
        <>

        <div className="row g-5 mt-5">
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
              },
              index
            ) => (
              <div className="col-6 col-md-4 mb-3" key={index}>
                <Link
                  to={`/product/${_id}`}
                  className="text-decoration-none text-reset"
                  onClick={() => setShow(false)}  

                >
                  <div className="position-relative">
                    <div className="ratio ratio-4x3">
                      <img
                        src={thumbnail}
                        alt={name}
                        className="w-100 h-100 object-fit-cover rounded-3 category-img"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                    <div className="p-3">
                      <h5 className="mt-3 mb-2">{name}</h5>
                      <h5 className="text-secondary fw-light">
                        {gender}'s {category}
                      </h5>

                      <h5 className="text-secondary fw-light mb-3">
                        Colors{" "}
                        {Array.isArray(colors)
                          ? colors.length
                          : colors && typeof colors === "object"
                          ? Object.keys(colors).length
                          : 0}
                      </h5>

                      <div className="d-flex align-items-baseline gap-3">
                        {
                            discountPercent > 0 && (
                                 <h5 className="mb-0">₹ {price}</h5>
                            )
                        }
                       
                        <h5 className="mb-0 text-secondary fw-light">
                          MRP: {mrp}
                        </h5>
                      </div>

                      { discountPercent > 0 && ( <span className="position-absolute top-0 start-0 mt-1 ms-1 px-2 py-1 bg-black text-white small fw-semibold rounded-1">
                        {discountPercent}% OFF
                      </span> )}
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>

        </>
    )
}

export default Card