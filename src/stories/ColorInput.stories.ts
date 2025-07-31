import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorInput } from '../components/inputs/ColorInput';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/ColorInput',
  component: ColorInput,
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {
 
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('ColorInput', {
          Label: 'Color',
          Value: '#3b82f6',
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof ColorInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
