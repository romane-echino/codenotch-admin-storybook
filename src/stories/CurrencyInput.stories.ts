import type { Meta, StoryObj } from '@storybook/react-vite';
import { CurrencyInput } from '../components/inputs/CurrencyInput';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/CurrencyInput',
  component: CurrencyInput,
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('CurrencyInput', {
          Label: 'Price',
          Value: 0,
          Currency: 'EUR',
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
