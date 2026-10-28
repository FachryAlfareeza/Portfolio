import type { Metadata } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import { portfolio } from "@/content";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolio.profile.name} | Software and Data`,
  description:
    "Portfolio of Muhammad Fachry Alfareeza — software engineering, data analysis, and applied AI.",
};

// Runs before paint to set the theme class, preventing a flash of the wrong theme.
const noFlashTheme = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body className="bg-paper text-ink transition-colors dark:bg-night-900 dark:text-[#F4EFEA]">
        {children}
      </body>
    </html>
  );
}
