import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;

      const { pathname } = req.nextUrl;
      // Coarse role gate from the JWT. Every admin API handler and the admin
      // layout additionally re-check the role in the database.
      if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        return token.accessType === "admin";
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/api/cabinet/:path*",
    "/api/chats/:path*",
    "/admin/:path*",
    "/cabinet/:path*",
  ],
};
