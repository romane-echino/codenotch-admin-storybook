import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '../components/inputs/Slider';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
    
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Slider', {
          Label: 'Slider',
          Min: 0,
          Max: 100,
          Value: 50,
          Step: 1,
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
