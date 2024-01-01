import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import styles from "./layout.module.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Analytics />
          <SpeedInsights />
          <Notifications position="bottom-right" />
          <div className={styles.mainLayout}>
            <Header className={styles.header} />
            <div className={styles.content}>{children}</div>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
