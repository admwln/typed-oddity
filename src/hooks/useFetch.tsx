import { useState, useEffect } from "react";

type FetchedFact = {
  data: string | null;
  error: string;
};

function useFetch(url: string, dependencies: any[] = []): FetchedFact {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data?.text);
      } catch (error) {
        setError("Oops, something went wrong!");
      }
    };

    fetchData();

    // Cleanup function to prevent state update on unmount
    return () => {};
  }, [url, ...dependencies]); // Dependency array includes url

  return { data, error };
}

export default useFetch;
