'use client';

import { memo } from 'react';
import { useWaitTimes } from '../hooks/useWaitTimes';
import { StatCard } from './StatCard';
import { DashboardSkeleton } from './DashboardSkeleton';
import { DashboardError } from './DashboardError';
import { TriageProcess } from '../../../shared/components/TriageProcess';
import { formatMinutes } from '../../../shared/utils/formatMinutes';
import { formatTimeAgo } from '../../../shared/utils/formatTimeAgo';
import { useNow } from '../../../shared/hooks/useNow';
import '../../../shared/styles/dashboard.css';

function DashboardStatsComponent() {
  const { data, isLoading, error } = useWaitTimes();
  const now = useNow(30000);

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
              <h1 className="headingPrimary">ER Wait Times</h1>
              <p className="descriptionPrimary" aria-live="polite">
                Last Updated: <span suppressHydrationWarning>{data ? formatTimeAgo(data.lastUpdated, now) : 'N/A'}</span>
              </p>
            </div>
          </div>
        </header>

        <main className="main" role="main" aria-labelledby="dashboard-title">
          <div className="mainPadding">
            <div className="grid" role="region" aria-label="Emergency room statistics">
              <StatCard
                title="Estimated Wait Time"
                value={`${formatMinutes(data?.averageWaitTime || 0)}`}
                description="This is the average time from arrival to being seen by a qualified medical professional"
                icon="wait-time"
              />
              <StatCard
                title="Patients Currently Waiting"
                value={data?.currentPatients || 0}
                description="This is the number of patients waiting to be seen and in treatment areas."
                icon="patients"
              />
            </div>

            <TriageProcess />
          </div>
        </main>
      </div>
  );
}

export const DashboardStats = memo(DashboardStatsComponent);