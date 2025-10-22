import { useEffect, useState } from "react";

/**
 * Generic useLocalStorage hook
 * - key: localStorage key
 * - initialValue: initial value when none exists
 */
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (error) {
      console.warn("useLocalStorage: Failed to read from localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn("useLocalStorage: Failed to save to localStorage", error);
    }
  }, [key, state]);

  return [state, setState];
}
