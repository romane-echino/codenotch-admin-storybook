import type { Meta, StoryObj } from '@storybook/react-vite';
import { Application } from '../components/globals/Application';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Globals/Application',
  component: Application,
  tags: ['autodocs'],
  argTypes: {
  
  },
  args: {

  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Application', {
          Title: 'My Application',
          Children: 'Application content goes here'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Application>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
