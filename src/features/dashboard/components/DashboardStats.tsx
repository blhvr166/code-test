'use client';

import { memo } from 'react';
import { useWaitTimes } from '../hooks/useWaitTimes';
import { StatCard } from './StatCard';
import { DashboardSkeleton } from './DashboardSkeleton';
import { DashboardError } from './DashboardError';
import { formatMinutes } from '../../../shared/utils/formatMinutes';
import { formatDateTime } from '../../../shared/utils/formatDateTime';
import '../../../shared/styles/dashboard.css';

function DashboardStatsComponent() {
  const { data, isLoading, error } = useWaitTimes();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <DashboardError />;
  }

  return (
    <div className="container">
      <header className="header" role="banner">
        <div className="headerContent">
          <div className="headerInner">
            <h1 className="title">ER CareView Dashboard</h1>
            <p className="subtitle" aria-live="polite">
              Real-time emergency room statistics
            </p>
          </div>
        </div>
      </header>

      <main className="main" role="main" aria-labelledby="dashboard-title">
        <div className="mainPadding">
          <div className="grid" role="region" aria-label="Emergency room statistics">
            <StatCard
              title="Average Wait Time"
              value={formatMinutes(data?.averageWaitTime || 0)}
              description="Across all patients"
            />
            <StatCard
              title="Current Patients"
              value={data?.currentPatients || 0}
              description="In emergency room"
            />
            <div className="triageCard" role="region" aria-labelledby="triage-title">
              <h2 id="triage-title" className="triageTitle">Triage Levels</h2>
              <div className="triageList" role="list">
                {data?.triageStats.map((stat) => (
                  <div key={stat.level} className="triageItem" role="listitem">
                    <span className="triageLabel" aria-label={`Triage level ${stat.level}`}>
                      Level {stat.level}
                    </span>
                    <div className="triageRight">
                      <div className="triageCount" aria-label={`${stat.count} patients at triage level ${stat.level}`}>
                        {stat.count} patients
                      </div>
                      <p className="triageWait" aria-label={`Average wait time: ${formatMinutes(stat.avgWait)}`}>
                        {formatMinutes(stat.avgWait)} avg
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <footer className="footer" role="contentinfo">
            <p className="footerText" aria-live="polite" aria-label={`Last updated ${data ? formatDateTime(data.lastUpdated) : 'N/A'}`}>
              Last updated: {data ? formatDateTime(data.lastUpdated) : 'N/A'}
            </p>
            <p className="footerSubtext">Data refreshes every 30 seconds</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export const DashboardStats = memo(DashboardStatsComponent);