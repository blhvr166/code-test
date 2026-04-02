import { memo } from 'react';
import '../../../shared/styles/dashboard.css';

function DashboardErrorComponent() {
  return (
    <div className="errorContainer" role="alert" aria-live="assertive">
      <div className="errorContent">
        <p className="errorText">Error loading dashboard data</p>
        <p className="errorDescription">Please try again later</p>
      </div>
    </div>
  );
}

export const DashboardError = memo(DashboardErrorComponent);