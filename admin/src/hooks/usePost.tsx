// usePost.tsx
import { useState, useCallback } from 'react';

type HttpMethod = 'POST';

interface UseFetchOptions<T> {
    url: string;
    method: HttpMethod;
    headers?: HeadersInit;
    body: T;
}

interface UseFetchResponse<R> {
    data: R | null;
    error: string | null;
    loading: boolean;
    postRequest: () => Promise<void>;
}

const usePost = <T, R>({ url, headers, body }: UseFetchOptions<T>): UseFetchResponse<R> => {
    const [data, setData] = useState<R | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const postRequest = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    ...headers,
                },
                body: body instanceof FormData ? body : JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [url, headers, body]);

    return { data, error, loading, postRequest };
};

export default usePost;
