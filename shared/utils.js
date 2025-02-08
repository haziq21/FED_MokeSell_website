import { supabase } from "./client.js";

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
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  } else {
    return diffWeeks === 1 ? "1 week ago" : `${diffWeeks} weeks ago`;
  }
}

// Used with Alpine.data()
export const userData = () => ({
  loggedIn: null,

  async init() {
    this.loggedIn = (await supabase.auth.getSession()).data.session !== null;
  },
});
