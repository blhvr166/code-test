import { ReactNode } from 'react';
import '../styles/dashboard.css';

interface FeaturePageShellProps {
  title: string;
  children?: ReactNode;
}

export function FeaturePageShell({ title, children }: FeaturePageShellProps) {
  return (
    <div className="container">
      <header className="header" role="banner">
        <div className="headerContent">
          <div className="headerInner">
            <h1 id="feature-page-title" className="headingPrimary">{title}</h1>
          </div>
        </div>
      </header>

      <main className="main" role="main" aria-labelledby="feature-page-title">
        <div className="mainPadding">
          {children}
        </div>
      </main>
    </div>
  );
}
