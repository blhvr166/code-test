import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWaitTimes } from '@/features/dashboard/hooks/useWaitTimes';

// Mock fetch
global.fetch = jest.fn();

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);

describe('useWaitTimes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useWaitTimes(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('returns data when fetch succeeds', async () => {
    const mockData = {
      averageWaitTime: 45,
      currentPatients: 12,
      lastUpdated: '2024-01-01T12:00:00Z',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useWaitTimes(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useWaitTimes(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
  });

  it('refetches data automatically after 2 minutes', async () => {
    // Use fake timers to control time
    jest.useFakeTimers();

    const initialData = {
      averageWaitTime: 45,
      currentPatients: 12,
      lastUpdated: '2024-01-01T12:00:00Z',
    };

    const updatedData = {
      averageWaitTime: 60,
      currentPatients: 15,
      lastUpdated: '2024-01-01T12:00:30Z',
    };

    // Mock initial fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => initialData,
    });

    const { result } = renderHook(() => useWaitTimes(), { wrapper });

    // Wait for initial data to load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(initialData);

    // Mock the refetch call
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => updatedData,
    });

    // Advance time by 2 minutes to trigger refetch
    jest.advanceTimersByTime(120000);

    // Wait for the data to update
    await waitFor(() => {
      expect(result.current.data).toEqual(updatedData);
    });

    expect(result.current.data?.averageWaitTime).toBe(60);
    expect(result.current.data?.currentPatients).toBe(15);

    // Restore real timers
    jest.useRealTimers();
  });
});