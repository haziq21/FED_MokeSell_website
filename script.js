import { supabase } from "./shared/client.js";
import Alpine from "./shared/alpine.min.js";

Alpine.data("user", () => ({
  loggedIn: null,

  async init() {
    this.loggedIn = (await supabase.auth.getSession()).data.session !== null;
  },
}));

Alpine.data("listings", () => ({
  listings: [],

  async init() {
    const { data, error } = await supabase.from("listings").select(`
      id,
      description,
      price,
      condition,
      thumbnail_path,
      users (id, username)
    `);

    if (error) {
      console.error(error);
      return;
    }

    for (const l of data) {
      const { data } = supabase.storage.from("images").getPublicUrl(l.thumbnail_path);
      l.thumbnail = data.publicUrl;
    }

    this.listings = data;
  },
}));

Alpine.start();
