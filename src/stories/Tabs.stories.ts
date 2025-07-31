import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from '../components/layouts/Tabs';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
    
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Tabs', {
          Tabs: [
            { id: 'tab1', title: 'Tab 1', content: 'Content for tab 1' },
            { id: 'tab2', title: 'Tab 2', content: 'Content for tab 2' },
            { id: 'tab3', title: 'Tab 3', content: 'Content for tab 3' }
          ],
          ActiveTab: 'tab1'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
