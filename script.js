import { supabase } from "./shared/client.js";
import Alpine from "./shared/alpine.min.js";
import { getAge, navData } from "./shared/utils.js";

Alpine.data("nav", navData);

Alpine.data("listings", () => ({
  listings: [],
  dropdownOpen: false,

  async init() {
    const { data, error } = await supabase
      .from("listings")
      .select(
        `id,
         name,
         price,
         condition,
         listed_at,
         thumbnail_path,
         users (id, username)`
      )
      .order("listed_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    for (const l of data) {
      const { data } = supabase.storage.from("images").getPublicUrl(l.thumbnail_path);
      l.thumbnail = data.publicUrl;
      l.age = getAge(new Date(l.listed_at));
    }

    this.listings = data;
  },
}));

Alpine.start();
