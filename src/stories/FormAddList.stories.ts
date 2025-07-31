import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormAddList } from '../components/inputs/FormAddList';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/FormAddList',
  component: FormAddList,
  tags: ['autodocs'],
  argTypes: {
  
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('FormAddList', {
          Label: 'Add Items',
          Items: [
            { id: '1', value: 'Item 1' },
            { id: '2', value: 'Item 2' }
          ]
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof FormAddList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};