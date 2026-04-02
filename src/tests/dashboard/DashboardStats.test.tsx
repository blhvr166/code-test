import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';

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

const renderWithClient = (client: QueryClient) => {
  return render(
    <QueryClientProvider client={client}>
      <DashboardStats />
    </QueryClientProvider>
  );
};

describe('DashboardStats', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', () => {
    const client = createTestQueryClient();
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(() => {}) // Never resolves
    );

    renderWithClient(client);

    expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
  });

  it('displays dashboard data when loaded', async () => {
    const client = createTestQueryClient();
    const mockData = {
      averageWaitTime: 45,
      currentPatients: 12,
      triageStats: [
        { level: 1, count: 2, avgWait: 10 },
        { level: 2, count: 5, avgWait: 30 },
      ],
      lastUpdated: '2024-01-01T12:00:00Z',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    renderWithClient(client);

    await waitFor(() => {
      expect(screen.getByText('ER CareView Dashboard')).toBeInTheDocument();
    });

    expect(screen.getByText('45 min')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('2 patients')).toBeInTheDocument();
  });

  it('displays error state when fetch fails', async () => {
    const client = createTestQueryClient();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    renderWithClient(client);

    await waitFor(() => {
      expect(screen.getByText('Error loading dashboard data')).toBeInTheDocument();
    });
  });

  it('updates display when data changes after refetch interval', async () => {
    // Use fake timers to control time
    jest.useFakeTimers();

    const client = createTestQueryClient();
    const initialData = {
      averageWaitTime: 45,
      currentPatients: 12,
      triageStats: [
        { level: 1, count: 2, avgWait: 10 },
        { level: 2, count: 5, avgWait: 30 },
      ],
      lastUpdated: '2024-01-01T12:00:00Z',
    };

    const updatedData = {
      averageWaitTime: 75,
      currentPatients: 18,
      triageStats: [
        { level: 1, count: 4, avgWait: 20 },
        { level: 2, count: 8, avgWait: 45 },
      ],
      lastUpdated: '2024-01-01T12:00:30Z',
    };

    // Mock initial fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => initialData,
    });

    renderWithClient(client);

    // Wait for initial data to display
    await waitFor(() => {
      expect(screen.getByText('45 min')).toBeInTheDocument();
    });

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('2 patients')).toBeInTheDocument();

    // Mock the refetch call
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => updatedData,
    });

    // Advance time by 30 seconds to trigger refetch
    jest.advanceTimersByTime(30000);

    // Wait for the UI to update with new data
    await waitFor(() => {
      expect(screen.getByText('75 min')).toBeInTheDocument();
    });

    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('4 patients')).toBeInTheDocument();

    // Restore real timers
    jest.useRealTimers();
  });
});