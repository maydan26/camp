import { useRef } from "react";

const useDebounce = (
  callbackFun: (...args: any[]) => Promise<void>,
  time: number
) => {
  const timeoutId = useRef<number | null>(null);

  const debounce = (...args: any[]) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    const id = setTimeout(() => {
      callbackFun(...args);
      timeoutId.current = null;
    }, time);

    timeoutId.current = id;
  };

  return debounce;
};

export default useDebounce;
