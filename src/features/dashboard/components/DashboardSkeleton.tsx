import { memo } from 'react';
import '../../../shared/styles/dashboard.css';

function DashboardSkeletonComponent() {
  return (
    <div className="loadingContainer" role="status" aria-live="polite" aria-label="Loading dashboard data">
      <div className="loadingContent">
        <div className="spinner" aria-hidden="true"></div>
        <p className="loadingText">Loading dashboard...</p>
      </div>
    </div>
  );
}

export const DashboardSkeleton = memo(DashboardSkeletonComponent);