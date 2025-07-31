import type { Meta, StoryObj } from '@storybook/react-vite';
import { HiddenInput } from '../components/inputs/HiddenInput';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/HiddenInput',
  component: HiddenInput,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('HiddenInput', {
          Name: 'hidden_field',
          Value: 'hidden_value'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof HiddenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    Value: 'hidden_value',
  },
};