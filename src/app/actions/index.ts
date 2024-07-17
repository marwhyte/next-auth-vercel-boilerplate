"use server";

import { signIn, signOut } from "@/auth";

export async function doGoogleLogin() {
  await signIn("google", { redirectTo: "/home" });
}

export async function doCredentialsLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    return response;
  } catch (e) {
    console.error("hi", e);
    throw e;
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
