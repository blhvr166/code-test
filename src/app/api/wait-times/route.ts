import { NextResponse } from 'next/server';

export async function GET() {
  // Generate realistic mock data with some randomness
  const baseWaitTime = Math.floor(Math.random() * 30) + 20; // 20-50 minutes
  const patientCount = Math.floor(Math.random() * 15) + 5; // 5-20 patients

  const waitTimes = {
    averageWaitTime: baseWaitTime,
    currentPatients: patientCount,
    lastUpdated: new Date().toISOString(),
  };

  // Simulate API delay (optional)
  await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));

  return NextResponse.json(waitTimes);
}