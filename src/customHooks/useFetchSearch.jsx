import { useState, useEffect } from "react";

const useFetchSearch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return; 

    
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);

      fetch(url)
        .then((res) => {
          if (res.status === 404) {
            setData([]); 
            return [];
          }
          return res.json();
        })
        .then((data) => {
         
          setData(data);
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }, 300);

    
    return () => clearTimeout(timer);
  }, [url]);

  return { data, loading, error };
};

export default useFetchSearch;
