import type { Metadata } from 'next';
import '@fontsource/inter';
import './globals.css';

export const metadata: Metadata = {
  title: 'Games Finder',
  description: 'Games Finder - working title',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
