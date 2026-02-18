// hooks/useDebounce.ts - Hook para debounce de funções
import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
}

// hooks/useClickPrevention.ts - Hook para prevenir cliques duplos
import { useCallback, useRef } from 'react';

export function useClickPrevention<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 1000
): T {
  const isProcessingRef = useRef(false);

  return useCallback(async (...args: Parameters<T>) => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;

    try {
      await callback(...args);
    } finally {
      setTimeout(() => {
        isProcessingRef.current = false;
      }, delay);
    }
  }, [callback, delay]) as T;
}