import type { Metadata } from "next";
import "@fontsource/inter";
import "./globals.css";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";

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
      <body>
        <CssVarsProvider>
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}
