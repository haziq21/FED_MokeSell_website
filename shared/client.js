import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://lrxcvpxsvcjiccuervrm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeGN2cHhzdmNqaWNjdWVydnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3OTA1MDQsImV4cCI6MjA1MzM2NjUwNH0.BO4LgBkbkN5Pk38gKi_RLyXHm0qk1F8Tcdx4EYqy0BE"
);

/**
 * Retrieve the user's ID from the current session.
 * @returns {Promise<{userId: string, error: null} | {userId: null, error: object}>}
 */
export async function getUserID() {
  const { data, error } = await supabase.auth.getSession();
  const userId = data.session?.user.id ?? null;
  return { userId, error };
}
