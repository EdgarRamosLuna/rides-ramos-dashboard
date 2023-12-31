import { Inter } from "next/font/google";
import "./globals.css";
import { Dashboard } from "@/components/dashboard";
import { MainContextProvider } from "@/context/MainContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rides Ramos",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainContextProvider>
          <Dashboard>{children}</Dashboard>
        </MainContextProvider>
      </body>
    </html>
  );
}
