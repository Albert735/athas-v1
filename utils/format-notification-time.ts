export function formatNotificationTime(date?: string) {
  if (!date) return "";

  const created = new Date(date);

  if (isNaN(created.getTime())) {
    return "";
  }

  const now = new Date();
  const diff = now.getTime() - created.getTime();

  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return created.toLocaleDateString();
}
