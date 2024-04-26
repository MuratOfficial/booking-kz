export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/api/cabinet/:path*",
    "/api/chats/:path*",
    "/admin/:path*",
    "/cabinet/:path*",
  ],
};
