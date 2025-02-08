import { MonitorProvider } from "@/context/MonitorContext";
import { apolloClient } from "@/queries/apolloClient";
import ApolloProvider from "@/queries/apolloProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { constructMetadata } from "@/utils/utils";

const inter = Inter({subsets : ["latin"]})



export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <ApolloProvider client={apolloClient}>
        <MonitorProvider>
        {children}
        </MonitorProvider>
        <ToastContainer/>
        </ApolloProvider>
      </body>
    </html>
  );
}
