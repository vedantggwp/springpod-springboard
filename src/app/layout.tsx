import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { DocHeader } from "@/components/layout/DocHeader";
import { DocSidebar } from "@/components/layout/DocSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchDialog } from "@/components/search/SearchDialog";
import { navigation } from "@/lib/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-nf" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-heading-nf" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-nf" });

export const metadata: Metadata = {
  title: {
    default: "SpringBoard",
    template: "%s | SpringBoard",
  },
  description:
    "Springpod's AI knowledge base — standards, guides, and tools for building with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sp-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-sp-teal focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
          >
            Skip to content
          </a>
          <DocHeader />
          <DocSidebar navigation={navigation} />
          <main id="main-content" className="min-w-0 flex-1 lg:ml-64">
            {children}
          </main>
          <MobileNav navigation={navigation} />
          <SearchDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
