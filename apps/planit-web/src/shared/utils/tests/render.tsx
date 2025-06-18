import { ThemeProvider } from '@./planit-shared-ui';
import { render } from '@testing-library/react';

export function renderComponent(components: React.ReactElement) {
  return render(<ThemeProvider>{components}</ThemeProvider>);
}
