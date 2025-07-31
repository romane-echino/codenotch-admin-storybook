import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/layouts/Buttons/Button';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    Label: { control: 'text', description: 'The button text', table: { type: { summary: 'string' } } },
    Icon: { control: 'text', description: 'The icon class name (FontAwesome)', table: { type: { summary: 'string' } } },
    Type: { 
      control: 'select', 
      options: ['Primary', 'Secondary', 'Tertiary', 'Success', 'Error', 'Warning', 'Info', 'MenuItem'], 
      description: 'The button type', 
      table: { type: { summary: 'string' } } 
    },
    Confirmation: { control: 'text', description: 'Confirmation message before action', table: { type: { summary: 'string' } } },
    Disabled: { control: 'boolean', description: 'Whether the button is disabled', table: { type: { summary: 'boolean' } } },
    OnClick: { action: 'clicked', description: 'Click handler', table: { type: { summary: 'Action<void>' } } },
  },
  args: {
    Label: 'Button',
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Button', {
          Label: 'Button',
          Type: 'Primary',
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    Type: 'Secondary',
    Label: 'Secondary Button',
  },
};

export const Success: Story = {
  args: {
    Type: 'Success',
    Label: 'Success Button',
  },
};

export const Error: Story = {
  args: {
    Type: 'Error',
    Label: 'Error Button',
  },
};

export const Warning: Story = {
  args: {
    Type: 'Warning',
    Label: 'Warning Button',
  },
};

export const Info: Story = {
  args: {
    Type: 'Info',
    Label: 'Info Button',
  },
};

export const WithIcon: Story = {
  args: {
    Icon: 'fas fa-save',
    Label: 'Save',
  },
};

export const Disabled: Story = {
  args: {
    Disabled: true,
    Label: 'Disabled Button',
  },
};

export const WithConfirmation: Story = {
  args: {
    Confirmation: 'Are you sure you want to proceed?',
    Label: 'Delete',
    Type: 'Error',
    Icon: 'fas fa-trash',
  },
};

export const MenuItem: Story = {
  args: {
    Type: 'MenuItem',
    Label: 'Menu Item',
    Icon: 'fas fa-user',
  },
}; 