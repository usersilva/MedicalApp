// hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';

export const useApi = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedFetchFunction = useCallback(fetchFunction, dependencies);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await memoizedFetchFunction();
        
        if (!isMounted) return;
        
        // Если ответ содержит поле data, используем его, иначе используем весь ответ
        const result = response?.data !== undefined ? response.data : response;
        
        if (!result) {
          throw new Error('Данные не получены от fetchFunction');
        }
        
        setData(result);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        console.error('Ошибка в useApi:', err);
        setError(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [memoizedFetchFunction]);

  return { data, loading, error };
};