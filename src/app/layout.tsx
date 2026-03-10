import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { DocHeader } from "@/components/layout/DocHeader";
import { DocSidebar } from "@/components/layout/DocSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchDialog } from "@/components/search/SearchDialog";
import { navigation } from "@/lib/navigation";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased"
        style={{ background: "var(--sp-bg)" }}
      >
        <ThemeProvider>
          <DocHeader />
          <DocSidebar navigation={navigation} />
          <main className="min-w-0 flex-1 lg:ml-64">
            {children}
          </main>
          <MobileNav navigation={navigation} />
          <SearchDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
