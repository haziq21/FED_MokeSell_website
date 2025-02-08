import { supabase } from "../shared/client.js";
import Alpine from "../shared/alpine.min.js";
import { userData, getAge } from "../shared/utils.js";

Alpine.data("user", userData);

Alpine.data("listing", () => ({
  category: "",
  subcategory: "",
  name: "",
  price: 0,
  age: "",
  condition: "",
  description: "",
  imageUrls: [],

  async init() {
    const { data, selectError } = await supabase
      .from("listings")
      .select(
        `id,
         name,
         price,
         condition,
         listed_at,
         image_paths,
         description,
         subcategories (category, subcategory)`
      )
      .eq("id", new URLSearchParams(window.location.search).get("id"))
      .single();

    if (selectError) {
      console.error(selectError);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    console.log(data);

    this.name = data.name;
    this.price = data.price;
    this.age = getAge(new Date(data.listed_at));
    this.condition = data.condition;
    this.category = data.subcategories.category;
    this.subcategory = data.subcategories.subcategory;
    this.description = data.description;
    this.imageUrls = data.image_paths.map((p) => supabase.storage.from("images").getPublicUrl(p).data.publicUrl);
  },
}));

Alpine.start();
