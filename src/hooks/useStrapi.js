import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export default function useStrapi(urlEnd, token = null) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const headersObj = useMemo(() => {
    return token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : null;
  }, [token]);

  // turim tureti state kad issaugoti meniu
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError('');
      try {
        console.log('axios sent request in useStrapi');
        const { data } = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}${urlEnd}`,
          headersObj
        );
        // console.log(data);
        setData(data);
      } catch (error) {
        setError('Something went wrong');
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [urlEnd, headersObj]);

  return [data, isLoading, error];
}
