export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString();
}