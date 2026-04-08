'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

export function ClientOnly({ children }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This mount gate intentionally avoids rendering children during hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}