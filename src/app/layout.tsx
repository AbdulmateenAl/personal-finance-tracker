'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from '@/app/components/Navigation';
import FinanceContextProvider from '@/app/lib/store/finance-context';
import AuthContextProvider from '@/app/lib/store/auth-context';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
              <Navigation />
              {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
