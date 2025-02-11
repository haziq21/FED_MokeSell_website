import { supabase, getUserID } from "../shared/client.js";
import { getAge, smallnavData } from "../shared/utils.js";
import Alpine from "../shared/alpine.min.js";

Alpine.data("smallnav", smallnavData);

Alpine.data("myListings", () => ({
  listings: [],

  async init() {
    const { userId, error } = await getUserID();
    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    const { data, selectError } = await supabase
      .from("listings")
      .select(
        `id,
         name,
         price,
         condition,
         listed_at,
         thumbnail_path,
         image_paths`
      )
      .eq("listed_by", userId);

    if (selectError) {
      console.error(selectError);
      return;
    }

    for (const l of data) {
      const { data } = supabase.storage.from("images").getPublicUrl(l.thumbnail_path);
      l.thumbnail = data.publicUrl;
      l.imageCount = l.image_paths.length;
      l.age = getAge(new Date(l.listed_at));
    }

    this.listings = data;
  },
}));

Alpine.start();
