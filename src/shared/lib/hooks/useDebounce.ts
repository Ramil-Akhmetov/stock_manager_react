import { useEffect, useState } from 'react';

// export function useDebounce(
//   callback: (...args: unknown[]) => void,
//   delay = 500
// ) {
//   const timer = useRef<NodeJS.Timeout>();
//
//   return useCallback(
//     (...args: unknown[]) => {
//       if (timer.current) {
//         clearTimeout(timer.current);
//       }
//       timer.current = setTimeout(() => {
//         callback(...args);
//       }, delay);
//     },
//     [callback, delay]
//   );
// }

export function useDebounce(value: string, delay: number = 500): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
