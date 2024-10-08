import { useCallback, useEffect, useState } from 'react';
import { getCookie } from '../helpers/cookies';

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`
        }
      });
      const json = await response.json();

      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchData;
