import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuButton } from '../components/layouts/Buttons/MenuButton';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/Buttons/MenuButton',
  component: MenuButton,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('MenuButton', {
          Label: 'Menu Button'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
