import { NextResponse } from 'next/server';

export async function GET() {
  // Generate realistic mock data with some randomness
  const baseWaitTime = Math.floor(Math.random() * 30) + 20; // 20-50 minutes
  const patientCount = Math.floor(Math.random() * 15) + 5; // 5-20 patients

  const waitTimes = {
    averageWaitTime: baseWaitTime,
    currentPatients: patientCount,
    triageStats: [
      {
        level: 1,
        count: Math.floor(Math.random() * 3) + 1, // 1-3 critical patients
        avgWait: Math.floor(baseWaitTime * 0.2) // 20% of average
      },
      {
        level: 2,
        count: Math.floor(Math.random() * 5) + 2, // 2-6 urgent patients
        avgWait: Math.floor(baseWaitTime * 0.6) // 60% of average
      },
      {
        level: 3,
        count: Math.floor(Math.random() * 8) + 3, // 3-10 stable patients
        avgWait: Math.floor(baseWaitTime * 1.2) // 120% of average
      },
    ],
    lastUpdated: new Date().toISOString(),
  };

  // Simulate API delay (optional)
  await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));

  return NextResponse.json(waitTimes);
}