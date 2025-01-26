import { supabase } from "./client.js";
import Alpine from "./alpine.min.js";

Alpine.data("signup", () => ({
  email: "",
  password: "",

  async signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
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
