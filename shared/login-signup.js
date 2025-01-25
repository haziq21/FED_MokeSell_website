import { supabase } from "./client.js";
import Alpine from "./alpine.min.js";

Alpine.data("registration", () => ({
  email: "",
  password: "",

  async signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: this.email,
      password: this.password,
    });

    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Please try again.");
      return;
    }

    this.handleRegistrationSuccess(data);
  },

  async logInUser() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (error) {
      console.error(error);
      alert("Oops, something went wrong. Please try again.");
      return;
    }

    this.handleRegistrationSuccess(data);
  },

  handleRegistrationSuccess() {
    window.location.href = "..";
  },
}));

Alpine.start();
