import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../components/layouts/Label';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    Value: { control: 'text', description: 'The label text', table: { category: 'General', type: { summary: 'string' } } },
    Title: { control: 'text', description: 'The label title', table: { category: 'General', type: { summary: 'string' } } },

    Type: { 
      control: 'select', 
      options: ['Date', 'Time', 'DateTime', 'Text', 'Duration', 'Currency', 'Percentage', 'Phone', 'Email', 'Url'], 
      description: 'Type of value to display', 
      table: { category: 'General', type: { summary: 'string' } } 
    },
    Size: { 
      control: 'select', 
      options: ['ExtraSmall', 'Small', 'Normal', 'Large'], 
      description: 'The label size', 
      table: { category: 'General', type: { summary: 'string' } } 
    },
  },
  args: {
    Value: 'Label Text',
    Title: 'Label Title',
    Type: 'Text',
    Size: 'Normal'
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Label', {
          Text: 'Label Text',
          Type: 'Default',
          Size: 'Normal'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    Value: 'Basic Label',
  },
};
