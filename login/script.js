import { supabase } from "../shared/client.js";
import Alpine from "../shared/alpine.min.js";

Alpine.data("login", () => ({
  email: "",
  password: "",

  async logInUser() {
    const { error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Redirect to the home page
    window.location.href = "..";
  },
}));

Alpine.start();
