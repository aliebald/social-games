import "./globals.css";
import "@mantine/core/styles.css";
import "@fontsource/inter";

import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "Games Finder",
  description: "Games Finder - working title",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
