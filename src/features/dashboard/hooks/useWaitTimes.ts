import { useQuery } from '@tanstack/react-query';
import { fetchWaitTimes } from '../api/waitTimes';
import { WaitTimesData } from '../types/wait-times';

export function useWaitTimes() {
  return useQuery<WaitTimesData>({
    queryKey: ['wait-times'],
    queryFn: fetchWaitTimes,
    refetchInterval: 120000, // 2 minutes
  });
}