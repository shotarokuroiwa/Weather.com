import { useState, useEffect } from "react";

const useDebounce = (value: string, time: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => clearTimeout(timer);
  }, [value, time]);

  return debounceValue;
};

export default useDebounce;
