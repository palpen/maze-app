import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maze Generator & Solver',
  description: 'Interactive maze generation and solving application with multiple algorithms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
