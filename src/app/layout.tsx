import type { Metadata } from "next";

import "./globals.css";
import Link from "next/link";
import localFont from 'next/font/local'
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle";
import DisabledLink from "@/components/ui/DisabledLink";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "ZINE MAKER 9000",
  description: "Generated by create next app",
};

// Font files can be colocated inside of `app`
const triodion = localFont({
  src: '../Triodion-Regular.ttf',
  display: 'swap',
  variable: '--font-triodion',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${triodion.variable}`} suppressHydrationWarning>
      <body>
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
              <div className="dark:text-emerald-400 cursor-default">zine maker 9000</div>
            </div>

            {/* Top-right cell (85% width, 10% height) */}
            <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex justify-between items-start">
              {/* Content for top-right section */}
              <div className="space-x-4">
                <Link href="/">Create</Link>
                <Link href='/explore' >Explore</Link>
                <DisabledLink>Export</DisabledLink>
              </div>
              <div className="space-x-4">
                <DisabledLink>Sign in</DisabledLink>
                <ThemeToggle />
              </div>
            </div>

            {/* Middle-left cell (15% width, 20% height) */}
            <div className="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col">
              {/* Content for middle-left section */}
              {/* <DisabledLink>About</DisabledLink>
              <DisabledLink>Sign in</DisabledLink>
              <DisabledLink>Updates</DisabledLink> */}

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
