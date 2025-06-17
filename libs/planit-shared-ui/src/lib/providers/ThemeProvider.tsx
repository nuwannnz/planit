import { Provider } from '../../generated/provider';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
