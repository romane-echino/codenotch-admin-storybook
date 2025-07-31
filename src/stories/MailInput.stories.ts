import type { Meta, StoryObj } from '@storybook/react-vite';
import { MailInput } from '../components/inputs/MailInput';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/MailInput',
  component: MailInput,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('MailInput', {
          Label: 'Email',
          Value: '',
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof MailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
