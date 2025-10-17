import { useState, useEffect } from "react";

const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false); 

  useEffect(() => {
    setLoading(true);
    setError(null);
    setNotFound(false);

    fetch(url)
      .then((res) => {
        if (res.status === 404) {       
          setData([]);
          setNotFound(true);
          return null;
        }

        if (!res.ok) {                   
          throw new Error(`HTTP error: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        if (data) setData(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error, notFound };
};

export default useFetch;
