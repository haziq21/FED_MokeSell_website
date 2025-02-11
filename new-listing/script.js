import { supabase, getUserID } from "../shared/client.js";
import Alpine from "../shared/alpine.min.js";
import { smallnavData } from "../shared/utils.js";

Alpine.data("smallnav", smallnavData);

Alpine.data("newListing", () => ({
  thumbnailUrl: null,
  imageUrls: [],

  async handleThumbnailChange(event) {
    this.thumbnailUrl = URL.createObjectURL(event.target.files[0]);
  },

  async handleImagesChange(event) {
    this.imageUrls = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
  },

  /**
   * Create a new listing in the database.
   * @param {SubmitEvent} event
   * @returns {Promise<void>}
   */
  async submitListing(event) {
    // Retrieve the current session to get the user's ID
    const { userId, error: sessionError } = await getUserID();
    if (sessionError) {
      console.error(sessionError);
      alert("You must be signed in to create a listing. Check the console for errors.");
      return;
    }

    const formData = new FormData(event.target);

    const files = [formData.get("thumbnail"), ...formData.getAll("images")];
    let dataToInsert = {
      listed_by: userId,
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      condition: formData.get("condition"),
      subcategory_id: formData.get("subcat"),
    };

    // Ensure that all fields are filled out
    if (Object.values(dataToInsert).some((val) => val === "") || files.some((file) => file.size === 0)) {
      alert("All fields are required.");
      return;
    }

    // Upload the thumbnail and product images concurrently
    const storageResults = await Promise.all(
      files.map(async (file) => {
        const ext = file.name.split(".").at(-1);
        const path = `${userId}/${crypto.randomUUID()}.${ext}`;
        return await supabase.storage.from("images").upload(path, file);
      })
    );

    // Check for errors in any of the image uploads
    if (storageResults.some((res) => res.error)) {
      console.error(storageResults);
      alert("Oops, something went wrong. Check the console for errors.");
    }

    dataToInsert = {
      ...dataToInsert,
      thumbnail_path: storageResults[0].data.path,
      image_paths: storageResults.slice(1).map((res) => res.data.path),
    };

    // Upload the listing information
    const { error } = await supabase.from("listings").insert(dataToInsert);

    // Check for errors in the listing upload
    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    // Redirect to the user's listings page
    window.location.href = "../my-listings";
  },
}));

Alpine.data("catSelect", () => ({
  categories: [],
  selectedCat: 0,

  async init() {
    const { data, error } = await supabase.from("categories").select("category, subcategories (id, subcategory)");
    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    this.categories = data.map(({ category, subcategories }) => ({
      category,
      subcategories: subcategories.reduce((acc, s) => ({ ...acc, [s.id]: s.subcategory }), {}),
    }));
  },
}));

// Redirect to the login page if the user is not signed in
getUserID().then(({ userId }) => {
  if (!userId) {
    window.location.href = "../login";
  }

  Alpine.start();
});
