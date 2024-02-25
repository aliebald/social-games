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
import Footer from "@/organisms/footer/footer";

export const metadata: Metadata = {
  title: "Social Games",
  description:
    "A collection of social games to play online with others. Discover games to play together or contribute new titles to the collection.",
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
            <main className={styles.content}>{children}</main>
            <Footer className={styles.footer} />
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
