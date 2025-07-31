import type { Meta, StoryObj } from '@storybook/react-vite';
import { Barchart } from '../components/charts/Barchart';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Charts/Barchart',
  component: Barchart,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Barchart', {
          Data: [
            { label: 'Jan', value: 100 },
            { label: 'Feb', value: 150 },
            { label: 'Mar', value: 200 },
            { label: 'Apr', value: 180 },
            { label: 'May', value: 250 },
            { label: 'Jun', value: 300 }
          ],
          Title: 'Monthly Sales',
          Color: 'Primary'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Barchart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
