import { useState, useEffect } from "react";

type FetchedFact = {
  data: string | null;
  loading: boolean;
  error: string;
};

function useFetch(url: string, dependencies: number[] = []): FetchedFact {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data?.text);
        setLoading(false);
      } catch (error) {
        setError("Oops, something went wrong!");
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to prevent state update on unmount
    return () => {};
  }, [url, ...dependencies]); // Dependency array includes url

  return { data, loading, error };
}

export default useFetch;
