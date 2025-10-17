import { useState, useEffect} from "react"



const useWishlistStatus = (productId) => {

    const [inWishlist, setInWishlist] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {

        setLoading(true)

        if(!productId){
            return
        }

        fetch(`https://next-step-ecommerce-backend.vercel.app/products/wishlist/status/${productId}`).then((res) => {
            if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
        }).then((data) => {
          
            setInWishlist(data.inWishlist);
            setError(null);
        }).catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    },[productId])

     return { inWishlist, setInWishlist, loading, error };

}

export default useWishlistStatus