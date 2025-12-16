import { adminClient, lastLoginMethodClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://fwm05pss-3000.asse.devtunnels.ms",
  plugins: [lastLoginMethodClient(), adminClient()],
});
