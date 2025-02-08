import { IPagination } from '@/interfaces/monitor.interface';
import { useState, useCallback } from 'react';

export const usePagination = (
  start: number = 0,
  end: number = 10
): [IPagination, (newLimit: IPagination) => void] => {
  const [limit, setLimit] = useState<IPagination>({ start, end });

  const updatePagination = useCallback((newLimit: IPagination) => {
    setLimit(newLimit);
  }, []);

  return [limit, updatePagination];
};
