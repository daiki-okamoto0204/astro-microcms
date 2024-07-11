import { useState, useCallback, useEffect } from 'react';

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  );

  useEffect(() => {
    const handlePopState = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const setParam = useCallback((params: Array<string>) => {
    const newSearchParams = new URLSearchParams();
    params.map((key, index) => newSearchParams.set(params[key], key))
    // newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
    return updateURL(newSearchParams);
  }, [searchParams]);

  const deleteParam = useCallback((key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    setSearchParams(newSearchParams);
    return updateURL(newSearchParams);
  }, [searchParams]);

  const updateURL = (params: URLSearchParams) => {
    const newURL = `${window.location.pathname}?${params.toString()}`;
    return newURL;
  };

  return { searchParams, setParam, deleteParam };
};