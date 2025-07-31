import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateInput } from '../components/inputs/DateInput';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('DateInput', {
          Label: 'Date',
          Value: new Date(),
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
