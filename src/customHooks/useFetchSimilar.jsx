import { useState, useEffect } from "react";

const useFetchSimilar = (url, initialData = []) => {
  const [productData, setProductData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    fetch(url)
      .then((res) => {
        if (res.status === 404) {
          setProductData([]);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setProductData(data.data || data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { productData, loading, error };
};

export default useFetchSimilar;
