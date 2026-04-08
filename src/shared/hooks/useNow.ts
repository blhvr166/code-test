import { useSyncExternalStore } from 'react';

interface NowStore {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => number;
  getServerSnapshot: () => number;
}

const nowStores = new Map<number, NowStore>();

function createNowStore(intervalMs: number): NowStore {
  // Keep initial value deterministic across server/client hydration.
  let nowValue = 0;
  let intervalId: number | null = null;
  const listeners = new Set<() => void>();

  const start = () => {
    if (intervalId !== null || typeof window === 'undefined') {
      return;
    }

    nowValue = Date.now();
    listeners.forEach((listener) => listener());

    intervalId = window.setInterval(() => {
      nowValue = Date.now();
      listeners.forEach((listener) => listener());
    }, intervalMs);
  };

  const stop = () => {
    if (intervalId === null || typeof window === 'undefined') {
      return;
    }

    window.clearInterval(intervalId);
    intervalId = null;
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      start();

      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          stop();
        }
      };
    },
    getSnapshot: () => nowValue,
    getServerSnapshot: () => 0,
  };
}

export function useNow(intervalMs = 30000) {
  const existingStore = nowStores.get(intervalMs);
  const store = existingStore ?? createNowStore(intervalMs);

  if (!existingStore) {
    nowStores.set(intervalMs, store);
  }

  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}