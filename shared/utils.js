export function getAge(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60 / 1000);
  const diffHours = Math.floor(diffMs / 60 / 60 / 1000);
  const diffDays = Math.floor(diffMs / 24 / 60 / 60 / 1000);
  const diffWeeks = Math.floor(diffMs / 7 / 24 / 60 / 60 / 1000);

  if (diffMins < 60) {
    return `${diffMins}min ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return `${diffWeeks} weeks ago`;
  }
}
