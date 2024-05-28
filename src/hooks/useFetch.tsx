import { useState, useEffect } from "react";

export type FetchedFact<T> = {
  data: T | null;
  error?: string;
};

function useFetch<T>(url: string, dependencies: any[] = []): FetchedFact<T> {
  const [fetchedData, setFetchedData] = useState<FetchedFact<T>>({
    data: null,
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(url);
        const data: T = await response.json();
        setFetchedData({
          data: data,
        });
      } catch (error) {
        setFetchedData({
          data: null,
          error: "Failed to fetch data",
        });
      }
    };

    fetchData();

    // Cleanup function to prevent state update on unmount
    return () => {};
  }, [url, ...dependencies]); // Dependency array includes url

  return fetchedData;
}

export default useFetch;
