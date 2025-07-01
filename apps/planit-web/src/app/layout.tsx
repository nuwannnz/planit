import {
  ColorMode,
  CoreProviders,
  HTML_BASE_PROPS,
} from '@/shared/providers/CoreProviders';

import '@mantine/core/styles.css';
import './global.css';
import logger from '@/shared/services/logger/Logger';

export const metadata = {
  title: 'Welcome to planIt',
  description: 'Plan your life',
};

logger.canLog = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" {...HTML_BASE_PROPS}>
      <head>
        <ColorMode />
      </head>
      <body className="h-full" suppressHydrationWarning>
        <CoreProviders>{children}</CoreProviders>
      </body>
    </html>
  );
}
