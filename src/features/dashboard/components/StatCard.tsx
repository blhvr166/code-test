import { memo } from 'react';
import '../../../shared/styles/dashboard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

function StatCardComponent({ title, value, description }: StatCardProps) {
  return (
    <div className="card" role="region" aria-labelledby={`stat-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <h3 id={`stat-${title.replace(/\s+/g, '-').toLowerCase()}`} className="cardTitle">
        {title}
      </h3>
      <div
        className="cardValue"
        aria-label={`${title}: ${value}`}
        role="text"
      >
        {value}
      </div>
      <p className="cardDescription" aria-describedby={`stat-${title.replace(/\s+/g, '-').toLowerCase()}`}>
        {description}
      </p>
    </div>
  );
}

export const StatCard = memo(StatCardComponent);