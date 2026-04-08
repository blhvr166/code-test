import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

function renderWithClient() {
  const client = createTestQueryClient();
  return render(
    <QueryClientProvider client={client}>
      <NotificationBell />
    </QueryClientProvider>,
  );
}

describe('NotificationBell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hides badge when all notifications are marked as read', () => {
    renderWithClient();

    fireEvent.click(screen.getByRole('button', { name: /open notifications/i }));
    fireEvent.click(screen.getByRole('button', { name: /mark all as read/i }));

    expect(screen.queryByLabelText(/unread notifications/i)).toBeNull();
  });

  it('supports keyboard dismissal using Escape', () => {
    renderWithClient();

    fireEvent.click(screen.getByRole('button', { name: /open notifications/i }));
    expect(screen.getByRole('dialog', { name: /notifications/i })).not.toBeNull();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /notifications/i })).toBeNull();
  });

  it('shows seeded notifications and hides view-all button when total is three', () => {
    renderWithClient();

    fireEvent.click(screen.getByRole('button', { name: /open notifications/i }));

    expect(screen.getByText('Your registration form has been received.')).not.toBeNull();
    expect(screen.getByText('Estimated wait time updated: 45 min.')).not.toBeNull();
    expect(screen.getByText('Doctor available for consultation.')).not.toBeNull();
    expect(screen.queryByRole('button', { name: /view all notifications/i })).toBeNull();
  });
});
