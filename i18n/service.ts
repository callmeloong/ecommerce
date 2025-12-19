"use server";

import { LOCALE_COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";

export async function getUserLocale() {
  return (await cookies()).get(LOCALE_COOKIE_NAME)?.value || "en";
}

export async function setUserLocale(locale: "vi" | "en") {
  (await cookies()).set(LOCALE_COOKIE_NAME, locale);
}
