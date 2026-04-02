export interface WaitTimesData {
  averageWaitTime: number;
  currentPatients: number;
  triageStats: Array<{
    level: number;
    count: number;
    avgWait: number;
  }>;
  lastUpdated: string;
}