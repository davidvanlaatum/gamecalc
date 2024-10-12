import { useCallback, useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getValue = useCallback(() => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(getValue);
  const [cacheJSONValue, setCacheJSONValue] = useState<string>(() => JSON.stringify(storedValue));

  const setValue = (value: T) => {
    const newValue = JSON.stringify(value);
    if (newValue !== cacheJSONValue) {
      setStoredValue(value);
      setCacheJSONValue(newValue);
      localStorage.setItem(key, newValue);
      window.dispatchEvent(new StorageEvent('storage', { key, newValue: newValue }));
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== cacheJSONValue) {
        setStoredValue(event.newValue ? (JSON.parse(event.newValue) as T) : initialValue);
      } else if (event.key == null) {
        setStoredValue(getValue());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, storedValue, cacheJSONValue, getValue]);

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
