import { useState, useEffect } from "react";

// <T> is a generic type that represents the type of data we receive from the API
// This means that we can use useFetch from
// any component and pass the type of data we expect to receive
export type FetchedFact<T> = {
  data: T | null;
  error?: string;
};

// <T> is used as a type parameter to make the useFetch hook generic
function useFetch<T>(
  url: string,
  dependencies: boolean[] | number[] = []
): FetchedFact<T> {
  const [fetchedData, setFetchedData] = useState<FetchedFact<T>>({
    data: null,
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      //Promise<void> because we are not returning anything
      try {
        const response = await fetch(url);
        const data: T = await response.json(); // T represents the type of data we expect to receive
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
  }, [...dependencies]);

  return fetchedData;
}

export default useFetch;
