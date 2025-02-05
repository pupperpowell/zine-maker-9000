import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZINE MAKER 9000",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid grid-cols-[0.15fr_0.85fr] grid-rows-[0.1fr_0.2fr_0.7fr] w-full h-screen p-4">
            {/* Top-left cell (15% width, 10% height) */}
            <div className="col-start-1 col-end-2 row-start-1 row-end-2">
              {/* Content for top-left section */}
              <div className="dark:text-emerald-400 uppercase cursor-default">zine maker 9000</div>
            </div>

            {/* Top-right cell (85% width, 10% height) */}
            <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex space-x-4">
              {/* Content for top-right section */}
              <Link href="#">Create</Link>
              <Link href="#">Explore</Link>
              <Link href="#">Export</Link>
              <Link href="#">Print</Link>
            </div>

            {/* Middle-left cell (15% width, 20% height) */}
            <div className="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col">
              {/* Content for middle-left section */}
              <Link href="#">About</Link>
              <Link href="#">Sign in</Link>
              <Link href="#">Updates</Link>
              <ThemeToggle />
            </div>


            {/* Bottom-right cell (85% width, 90% height) */}
            <div className="col-start-2 col-end-3 row-start-2 row-end-[-1]"> {/* Spans both middle and bottom rows */}
              {/* Content for bottom-right section */}
              {children}
            </div>

            {/* Bottom-left cell (15% width, 70% height) */}
            <div className="col-start-1 col-end-2 row-start-3 row-end-4">
              {/* Content for bottom-left section */}
            </div>

          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
