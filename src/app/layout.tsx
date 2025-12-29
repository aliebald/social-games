import "./globals.css";
import "@mantine/core/styles.css";

import styles from "./layout.module.css";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  ColorSchemeScript,
  MantineColorScheme,
  MantineProvider,
} from "@mantine/core";
import theme from "@/theme";
import Header from "@/organisms/header/header";
import Footer from "@/organisms/footer/footer";

export const metadata: Metadata = {
  title: "Social Games",
  description:
    "A collection of social games to play online with others. Discover games to play together or contribute new titles to the collection.",
  metadataBase: process.env.NEXT_PUBLIC_DOMAIN
    ? new URL(process.env.NEXT_PUBLIC_DOMAIN)
    : undefined,
  openGraph: {
    url: process.env.NEXT_PUBLIC_DOMAIN,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

const defaultColorScheme: MantineColorScheme = "dark";

export const viewport: Viewport = {
  themeColor: "#1a1b1e",
  colorScheme: defaultColorScheme,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme={defaultColorScheme} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme={defaultColorScheme}>
          <Analytics />
          <SpeedInsights />
          <div className={styles.mainLayout}>
            <Header className={styles.header} />
            <main className={styles.content}>{children}</main>
            <Footer className={styles.footer} />
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
