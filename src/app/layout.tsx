import "./globals.css";
import "@mantine/core/styles.css";
import "@fontsource/inter";

import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import theme from "@/theme";
import Header from "@/organisms/header/header";

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
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
