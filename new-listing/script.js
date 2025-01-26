import { supabase } from "../shared/client.js";
import Alpine from "../shared/alpine.min.js";

/**
 * Retrieve the user's ID from the current session.
 * @returns {Promise<{userId: string, error: null} | {userId: null, error: object}>}
 */
async function getUserID() {
  const { data, error } = await supabase.auth.getSession();
  const userId = data.session?.user.id ?? null;
  return { userId, error };
}

Alpine.data("newListing", () => ({
  description: "",
  price: 0,
  condition: "",
  /** `File` object from the file input. */
  thumbnailFile: null,
  /** URL created by `URL.createObjectURL()`. */
  thumbnailLocalUrl: null,
  /** Storage path in the images bucket on Supabase. */
  thumbnailStoragePath: null,

  async handleThumbnailChange(event) {
    const file = event.target.files[0];
    this.thumbnailFile = file;
    this.thumbnailLocalUrl = URL.createObjectURL(file);

    // Retrieve the current session to get the user's ID
    const { userId, error } = await getUserID();
    if (error) {
      console.error(error);
      alert("You must be signed in to upload images. Check the console for errors.");
      return;
    }

    // Construct the filepath for the thumbnail and upload it
    const fileExt = file.name.split(".").at(-1);
    this.thumbnailStoragePath = `${userId}/${crypto.randomUUID()}/thumbnail.${fileExt}`;
    const { error: storageError } = await supabase.storage.from("images").upload(this.thumbnailStoragePath, file);

    if (storageError) {
      console.error(storageError);
      alert("Oops, something went wrong. Check the console for errors.");
    }
  },

  async handleProductImagesChange(event) {},

  async createListing() {
    // Retrieve the current session to get the user's ID
    const { userId, error: sessionError } = await getUserID();
    if (sessionError) {
      console.error(sessionError);
      alert("You must be signed in to create a listing. Check the console for errors.");
      return;
    }

    // Upload the listing information
    const { error: listingsInsertError } = await supabase.from("listings").insert({
      description: this.description,
      price: this.price,
      condition: this.condition,
      listed_by: userId,
      thumbnail_path: this.thumbnailStoragePath,
    });

    if (listingsInsertError) {
      console.error(sessionError);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    // Redirect to the user's listings page
    window.location.href = "../my-listings";
  },
}));
