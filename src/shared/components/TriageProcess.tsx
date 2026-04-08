'use client';

import { memo } from 'react';
import '../styles/triage-process.css';

interface TriageStep {
  step: number;
  title: string;
  description: string;
}

const TRIAGE_STEPS: TriageStep[] = [
  {
    step: 1,
    title: 'Arrival & Check-in',
    description: 'Upon arrival, you\'ll check in at the registration desk. Please have your ID and insurance information ready.',
  },
  {
    step: 2,
    title: 'Triage Assessment',
    description: 'A triage nurse will assess your symptoms to determine the severity of your condition.',
  },
  {
    step: 3,
    title: 'Waiting Room',
    description: 'Patients are seen based on the severity of their condition, not on a first-come, first-served basis.',
  },
  {
    step: 4,
    title: 'Treatment',
    description: 'You will be taken to a treatment room to be seen by a doctor or other medical professional.',
  },
];

function TriageProcessComponent() {
  return (
    <section className="triageProcess" aria-labelledby="triage-title">
      <h2 id="triage-title" className="triageProcessTitle">How Our Triage Process Works</h2>
      <div className="triageStepsContainer">
        {TRIAGE_STEPS.map((item) => (
          <div key={item.step} className="triageStep">
            <div className="stepNumber">{item.step}</div>
            <div className="stepContent">
              <h3 className="stepTitle">{item.title}</h3>
              <p className="stepDescription">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const TriageProcess = memo(TriageProcessComponent);
