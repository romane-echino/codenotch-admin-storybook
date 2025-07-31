import type { Meta, StoryObj } from '@storybook/react-vite';
import { VCardButton } from '../components/layouts/Buttons/VCardButton';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/Buttons/VCardButton',
  component: VCardButton,
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {

  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('VCardButton', {
          Title: 'Card Title',
          Subtitle: 'Card Subtitle'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof VCardButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    Label: 'VCard Button',
  },
};
