import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalDialog } from '../components/layouts/ModalDialog';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/ModalDialog',
  component: ModalDialog,
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {

  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('ModalDialog', {
          Title: 'Modal Title',
          Content: 'This is the modal content. You can put any content here.',
          IsOpen: true
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof ModalDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
