import { supabase } from "./client.js";
import Alpine from "./alpine.min.js";

Alpine.data("login", () => ({
  email: "",
  password: "",

  async logInUser() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    // Redirect to the home page
    window.location.href = "..";
  },
}));

Alpine.start();
