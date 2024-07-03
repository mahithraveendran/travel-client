"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setTokenInCookie = (token: string, options: string) => {
  cookies().set({
    name: "authToken",
    value: token,
    httpOnly: true,
    secure: true,
  });
  if (options) {
    redirect(options);
  }
};

// remove token from cookie
export const removeTokenFromCookie = (key: string) => {
  cookies().set({
    name: key,
    value: "",
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
  redirect("/");
};
