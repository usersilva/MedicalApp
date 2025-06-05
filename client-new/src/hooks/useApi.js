import { useState, useEffect, useRef } from 'react';

const cache = new Map();

export const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiFuncRef = useRef(apiFunc);

    useEffect(() => {
        const fetchData = async () => {
            const cacheKey = apiFuncRef.current.toString();
            if (cache.has(cacheKey)) {
                setData(cache.get(cacheKey));
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await apiFuncRef.current();
                cache.set(cacheKey, response.data);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [apiFuncRef]);

    return { data, loading, error };
};