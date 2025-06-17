import { ThemeProvider } from '@./planit-shared-ui';
import './global.css';
export const metadata = {
  title: 'Welcome to planIt',
  description: 'Plan your life',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
