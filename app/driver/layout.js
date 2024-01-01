import { Inter } from "next/font/google";
import "../globals.css";

import { MainContextProvider } from "@/context/MainContext";
import { DashboardDrivers } from "@/components/dashboardDrivers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rides Ramos",
  description: "Drivers Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainContextProvider>
          <DashboardDrivers>{children}</DashboardDrivers>
        </MainContextProvider>
      </body>
    </html>
  );
}
