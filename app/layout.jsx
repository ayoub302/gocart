import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "GoCart. - Shop smarter",
  description: "GoCart. - Shop smarter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      {" "}
      {/* Cambiado a fr */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.className} antialiased m-0 p-0`}
      >
        <ClerkProvider>
          <StoreProvider>
            <Toaster />
            {children}
          </StoreProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
