import { useEffect } from 'react';
import { useState } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const res = await response.json();
          setData(res);
        }
      } catch (error) {
        setError(error)
      }
    }
    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, error };
}
