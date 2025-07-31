import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../components/inputs/Checkbox';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
   Title: { control: 'text', description: 'The label for the checkbox', table: { type: { summary: 'string' } } },
  },
  args: {
    Title: 'Checkbox Label',
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Checkbox', {
          Title: 'Checkbox Label',
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
