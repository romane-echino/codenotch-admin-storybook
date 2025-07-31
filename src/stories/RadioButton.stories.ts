import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from '../components/inputs/RadioButton';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('RadioButton', {
          Label: 'Radio Option',
          Value: 'option1',
          Checked: false,
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
