import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Providers } from "@/app/provider"
import Navbar from "@/components/Navbar/Navbar";
import ToastProvider from "./ToastProvider";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Booking@AC",
  description: "Created by Reyes Lee, Singapore",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locations = await prisma.location.findMany();
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar locations={locations} session={session} />
        <ToastProvider>
          <Providers>
            <div className="body">
              {children}
            </div>
          </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
