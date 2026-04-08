'use client';

import Link from 'next/link';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { NotificationBell } from '../../notifications/components/NotificationBell';
import '../styles/navigation.css';

interface NavigationLink {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavigationLink[] = [
  { label: 'Dashboard', href: '/dashboard', id: 'nav-dashboard' },
  { label: 'Patient Search', href: '/patient-search', id: 'nav-patient-search' },
  { label: 'Staff Directory', href: '/staff-directory', id: 'nav-staff-directory' },
  { label: 'Reports', href: '/reports', id: 'nav-reports' },
];

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.09722 19.4444L6.70833 16.3333C6.49769 16.2523 6.29919 16.1551 6.11285 16.0417C5.92651 15.9282 5.74421 15.8067 5.56597 15.6771L2.67361 16.8924L0 12.2743L2.50347 10.3785C2.48727 10.265 2.47917 10.1557 2.47917 10.0503C2.47917 9.94502 2.47917 9.83565 2.47917 9.72222C2.47917 9.60879 2.47917 9.49942 2.47917 9.3941C2.47917 9.28877 2.48727 9.1794 2.50347 9.06597L0 7.17014L2.67361 2.55208L5.56597 3.76736C5.74421 3.63773 5.93056 3.5162 6.125 3.40278C6.31945 3.28935 6.51389 3.19213 6.70833 3.11111L7.09722 -1.90735e-06H12.4444L12.8333 3.11111C13.044 3.19213 13.2425 3.28935 13.4288 3.40278C13.6152 3.5162 13.7975 3.63773 13.9757 3.76736L16.8681 2.55208L19.5417 7.17014L17.0382 9.06597C17.0544 9.1794 17.0625 9.28877 17.0625 9.3941C17.0625 9.49942 17.0625 9.60879 17.0625 9.72222C17.0625 9.83565 17.0625 9.94502 17.0625 10.0503C17.0625 10.1557 17.0463 10.265 17.0139 10.3785L19.5174 12.2743L16.8438 16.8924L13.9757 15.6771C13.7975 15.8067 13.6111 15.9282 13.4167 16.0417C13.2222 16.1551 13.0278 16.2523 12.8333 16.3333L12.4444 19.4444H7.09722ZM8.79861 17.5H10.7188L11.059 14.9236C11.5613 14.794 12.0272 14.6036 12.4566 14.3524C12.886 14.1013 13.2789 13.7975 13.6354 13.441L16.0417 14.4375L16.9896 12.7847L14.8993 11.2049C14.9803 10.978 15.037 10.739 15.0694 10.4878C15.1019 10.2367 15.1181 9.98148 15.1181 9.72222C15.1181 9.46296 15.1019 9.20775 15.0694 8.9566C15.037 8.70544 14.9803 8.46643 14.8993 8.23958L16.9896 6.65972L16.0417 5.00694L13.6354 6.02778C13.2789 5.65509 12.886 5.34317 12.4566 5.09201C12.0272 4.84085 11.5613 4.65046 11.059 4.52083L10.7431 1.94444H8.82292L8.48264 4.52083C7.98032 4.65046 7.51447 4.84085 7.08507 5.09201C6.65567 5.34317 6.26273 5.64699 5.90625 6.00347L3.5 5.00694L2.55208 6.65972L4.64236 8.21528C4.56134 8.45833 4.50463 8.70139 4.47222 8.94444C4.43982 9.1875 4.42361 9.44676 4.42361 9.72222C4.42361 9.98148 4.43982 10.2326 4.47222 10.4757C4.50463 10.7187 4.56134 10.9618 4.64236 11.2049L2.55208 12.7847L3.5 14.4375L5.90625 13.4167C6.26273 13.7894 6.65567 14.1013 7.08507 14.3524C7.51447 14.6036 7.98032 14.794 8.48264 14.9236L8.79861 17.5ZM9.81945 13.125C10.7593 13.125 11.5613 12.7928 12.2257 12.1285C12.89 11.4641 13.2222 10.662 13.2222 9.72222C13.2222 8.78241 12.89 7.98032 12.2257 7.31597C11.5613 6.65162 10.7593 6.31944 9.81945 6.31944C8.86343 6.31944 8.05729 6.65162 7.40104 7.31597C6.74479 7.98032 6.41667 8.78241 6.41667 9.72222C6.41667 10.662 6.74479 11.4641 7.40104 12.1285C8.05729 12.7928 8.86343 13.125 9.81945 13.125Z" fill="#D1D5DB"/>
    </svg>
  );
}

function NavigationComponent() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="navContainer">
        <div className="navBrand">
          <div className="navLogoWrapper" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18.3636 22C16.9945 22 15.8021 19.9193 15.1818 16.845C14.5615 19.9193 13.3691 22 12 22C10.6309 22 9.4385 19.9193 8.8182 16.845C8.19785 19.9193 7.00545 22 5.63635 22C3.62806 22 2 17.5229 2 12C2 6.47715 3.62806 2 5.63635 2C7.00545 2 8.19785 4.08072 8.8182 7.155C9.4385 4.08072 10.6309 2 12 2C13.3691 2 14.5615 4.08072 15.1818 7.155C15.8021 4.08072 16.9945 2 18.3636 2C20.372 2 22 6.47715 22 12C22 17.5229 20.372 22 18.3636 22Z" fill="#135BEC"/>
            </svg>
          </div>
          <span className="brandText">CareView</span>
        </div>

        <div className="navActions">
          <ul className="navList" aria-label="Primary" suppressHydrationWarning>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={`navLink ${isActive ? 'navLinkActive' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    suppressHydrationWarning
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="iconGroup">
            <NotificationBell />

            <button type="button" className="actionButton settingsButton" aria-label="Open settings">
              <span className="actionButtonBackground settingsBackground">
                <SettingsIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export const Navigation = memo(NavigationComponent);
