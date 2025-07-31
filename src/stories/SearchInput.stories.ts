import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from '../components/inputs/SearchInput';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('SearchInput', {
          Placeholder: 'Search...',
          Value: '',
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
