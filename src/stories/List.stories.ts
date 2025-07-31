import type { Meta, StoryObj } from '@storybook/react-vite';
import { List } from '../components/layouts/List';
import { toAUMLCode } from '../utils/StoriesUtils';
import { ListColumn } from '../components/layouts/ListColumn';

const meta = {
  title: 'Layouts/List',
  component: List,
  subcomponents: {ListColumn},
  tags: ['autodocs'],
  argTypes: {
   Source: { control: 'object', description: 'The data source for the list', table: { type: { summary: 'any' } } }, 
   Take: { control: 'number', description: 'Number of items to take from the source', table: { type: { summary: 'number' } } },
  },
  args: {
    
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('List', {
          Items: [
            { id: '1', title: 'Item 1', description: 'Description for item 1' },
            { id: '2', title: 'Item 2', description: 'Description for item 2' },
            { id: '3', title: 'Item 3', description: 'Description for item 3' }
          ],
          Type: 'Default'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
