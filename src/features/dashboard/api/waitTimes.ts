import { WaitTimesData } from '../types/wait-times';

export async function fetchWaitTimes(): Promise<WaitTimesData> {
  const response = await fetch('/api/wait-times');
  if (!response.ok) {
    throw new Error('Failed to fetch wait times');
  }
  return response.json();
}