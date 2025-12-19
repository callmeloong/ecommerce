import { LOCALE_COOKIE_NAME } from "@/lib/constants";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get(LOCALE_COOKIE_NAME)?.value || "en";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
