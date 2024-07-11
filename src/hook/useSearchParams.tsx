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

  const setParams = useCallback((params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams);
    updateURL(newSearchParams);
  }, [searchParams]);

  const deleteParam = useCallback((key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    setSearchParams(newSearchParams);
    updateURL(newSearchParams);
  }, [searchParams]);

  const updateURL = (params: URLSearchParams) => {
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.location.href = newURL;
  };

  return { searchParams, setParams, deleteParam };
};