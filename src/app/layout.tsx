import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { ErrorBoundary } from "../shared/components/ErrorBoundary";
import { ClientOnly } from "../shared/components/ClientOnly";
import { Navigation } from "../features/navigation/components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ER CareView",
  description: "Emergency Room Care View System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ErrorBoundary>
          <Providers>
            <ClientOnly>
              <Navigation />
            </ClientOnly>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
