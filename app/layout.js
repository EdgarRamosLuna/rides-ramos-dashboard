import { Inter } from "next/font/google";
import "./globals.css";
import { Dashboard } from "@/components/dashboard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rides Ramos",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Dashboard>{children}</Dashboard>
      </body>
    </html>
  );
}
