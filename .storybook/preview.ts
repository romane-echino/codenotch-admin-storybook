import type { Preview } from "@storybook/react-vite";
import '../src/index.css'
import { appyTint } from '../src/utils/ColorPaletteUtils';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

appyTint('#465fff');

export default preview;
