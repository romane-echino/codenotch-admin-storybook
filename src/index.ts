import './index.css'

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

export * from './components/inputs/TextInput';
export * from './components/globals/Alert';
export * from './components/inputs/Form';
export * from './components/layouts/Box';