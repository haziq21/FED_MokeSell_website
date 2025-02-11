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
export const navData = () => ({
  categories: [],
  activeCat: null,
  showPfp: null,
  dropdownOpen: false,

  async init() {
    this.showPfp = (await supabase.auth.getSession()).data.session !== null;

    const { data, error } = await supabase.from("categories").select("category, subcategories (subcategory)");
    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    this.categories = data.map(({ category, subcategories }) => ({
      category,
      subcategories: subcategories.map((s) => s.subcategory),
    }));
  },

  async signout(redirect) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    window.location = redirect;
  },
});

// Used with Alpine.data()
export const smallnavData = () => ({
  dropdownOpen: false,

  async signout(redirect) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    window.location = redirect;
  },
});
