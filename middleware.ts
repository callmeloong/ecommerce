// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // chưa login thì redirect về đây
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // bảo vệ /dashboard và các route con
};
