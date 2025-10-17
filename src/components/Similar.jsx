import useFetchSimilar from "../customHooks/useFetchSimilar"
import SimilarCard from './SimilarCard'

const Similar = ({id}) => {

    const {productData, loading, error} = useFetchSimilar(`https://next-step-ecommerce-backend.vercel.app/products/similar/${id}`)

    return (
        <>
        
          {loading && (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
              <div
                className="spinner-border text-dark"
                role="status"
                aria-label="Loading hot deals"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

           {!loading && error &&  (
                  <div className="alert alert-danger mt-5 text-center">
                    Failed to load. Please try again.
                  </div>
                )}

                {

                }

                {!loading && !error && productData.length === 0 && (
                  <div className="alert alert-danger mt-5 text-center">
                    No Products available.
                  </div>
                )}

                {!loading && !error && productData.length > 0 && (
                  <>
                  <div className="mt-5">

                     <SimilarCard data = {productData} />

                  </div>
                  
                  </>
                )}

          


        </>
    )
}

export default Similar