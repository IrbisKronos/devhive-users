import { useState, useEffect } from "react";

/**
 * Custom hook that debounces a rapidly changing value.
 * Delays updating the returned value until the input stops changing for `delay` ms.
 * Used to avoid filtering the user list on every keystroke in the search input.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
