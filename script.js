import { supabase } from "./shared/client.js";
import Alpine from "./shared/alpine.min.js";

Alpine.data("user", () => ({
  loggedIn: null,

  async init() {
    this.loggedIn = (await supabase.auth.getSession()).data.session !== null;
  },
}));

Alpine.start();
