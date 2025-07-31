import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from '../components/inputs/Dropdown';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
  
  },
  args: {

  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Dropdown', {
          Label: 'Select Option',
          Options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ],
          Value: '',
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    
  },
};
