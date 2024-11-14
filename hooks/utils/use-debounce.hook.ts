import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // useEffect to handle debouncing logic whenever `value` or `delay` changes
  useEffect(() => {
    // Set a timer that updates `debouncedValue` to `value` after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timer if `value` or `delay` changes before the timer completes,
    // preventing unnecessary updates to `debouncedValue`
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;