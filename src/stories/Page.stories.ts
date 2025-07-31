import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from '../components/globals/Page';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Globals/Page',
  component: Page,
  tags: ['autodocs'],
  argTypes: {
    Layout: { control: 'select', options: ['Grid', 'Flow', 'Full'], description: 'The layout type of the page', table: { type: { summary: 'string' } } },
    Header: { control: 'text', description: 'The page header', table: { type: { summary: 'string' } } },
  },
  args: {
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Page', {
          Title: 'Page Title',
          Children: 'Page content goes here'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
