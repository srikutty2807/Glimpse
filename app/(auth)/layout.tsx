import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import '../globals.css'
export const metadata = {
  title: "Glimpse",
  description: "A Glimpse of chit chats from people",
};
const monser = Montserrat({subsets:["latin"]})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${monser.className} bg-dark-1 `}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
