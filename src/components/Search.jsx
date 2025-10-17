import NextStepContext from  "../context/NextStepContext"
import { useContext} from "react"
import useFetchSearch from "../customHooks/useFetchSearch"  
import { Link } from "react-router-dom"
import Card from "./Card"



const Search = () => {

    const {search} = useContext(NextStepContext)

  


    if (search.trim() === "") {
    return null
  }

    
    const {data, loading, error} = useFetchSearch(`https://next-step-ecommerce-backend.vercel.app/products/search?q=${encodeURIComponent(search)}`)

    const products = data ?? []



    
    return (
        <>
        <div className="container mt-3 mb-5">
      

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

      {!loading && error && (
        <div className="alert bg-dark text-white mt-5 text-center" role="alert">
          Failed to load Search results. Please try again.
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="alert bg-dark text-white mt-5 text-center">WE’RE SORRY, WE DIDN’T FIND WHAT YOU ARE LOOKING FOR.</div>
      )}

      {!loading && !error && products.length > 0 && (
         <Card data={products} />
      )}
    </div>
          
        </>
    )

}


export default Search