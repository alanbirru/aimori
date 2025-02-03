import { clerkMiddleware } from "@clerk/nextjs/server";

// Export clerkMiddleware as the default middleware
export default clerkMiddleware();

// Configure matcher to cover all routes except static files
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
