import type { Meta, StoryObj } from '@storybook/react-vite';
import { Display } from '../components/layouts/Display';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/Display',
  component: Display,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Display', {
          Title: 'Display Title',
          Value: 'Display Value',
          Type: 'Text',
          Size: 'Normal'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Display>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
