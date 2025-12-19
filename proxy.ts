import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default withAuth(
  (req: NextRequest) => {
    const intlMiddleware = createMiddleware({
      ...routing,
    });

    return intlMiddleware(req);
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
