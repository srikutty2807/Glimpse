import { authMiddleware } from "@clerk/nextjs";
  
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ['/','/api/webhook/clerk','/api/uploadthing'],
  ignoredRoutes: ['/api/webhook/clerk']
});
 
export const config = {

  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};