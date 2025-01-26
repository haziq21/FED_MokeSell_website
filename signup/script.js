import { supabase } from "../shared/client.js";
import Alpine from "../shared/alpine.min.js";

Alpine.data("signup", () => ({
  username: "",
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

    // Set the user's username
    const { error: usernameError } = await supabase.from("users").insert({
      id: data.user.id,
      username: this.username,
    });

    if (usernameError) {
      console.error(usernameError);
      alert("Oops, something went wrong. Check the console for errors.");
      return;
    }

    // Redirect to the home page
    window.location.href = "..";
  },
}));

Alpine.start();
