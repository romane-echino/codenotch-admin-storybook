import type { Preview } from "@storybook/react-vite";
import '../src/index.css'
import { applyTint } from '../src/utils/ColorPaletteUtils';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  }
};

applyTint('#465fff');

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import 'dayjs/locale/fr'
import 'dayjs/locale/en'
import 'dayjs/locale/de'
import 'dayjs/locale/it'
import 'dayjs/locale/es'

dayjs.extend(localizedFormat)
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(weekday);

export default preview;
