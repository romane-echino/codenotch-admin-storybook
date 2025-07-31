import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../components/globals/Icon';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Globals/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    Value: { control: 'text', description: 'The icon class name (FontAwesome)', table: { type: { summary: 'string' } } },
    Size: { 
      control: 'select', 
      options: ['ExtraSmall', 'Small', 'Normal', 'Large', 'ExtraLarge'], 
      description: 'The size of the icon', 
      table: { type: { summary: 'string' } } 
    },
    Color: { 
      control: 'select', 
      options: ['Primary', 'Success', 'Error', 'Warning', 'Info', 'Inherit'], 
      description: 'The color of the icon', 
      table: { type: { summary: 'string' } } 
    },
    Animate: { 
      control: 'select', 
      options: ['None', 'Beat', 'Fade', 'Spin'], 
      description: 'The animation type', 
      table: { type: { summary: 'string' } } 
    },
  },
  args: {
    Value: 'fas fa-home',
    Size: 'Normal',
    Color: 'Primary',
    Animate: 'None'
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Icon', {
          Value: 'fas fa-home',
          Size: 'Normal',
          Color: 'Primary',
          Animate: 'None'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    Size: 'Small',
    Value: 'fas fa-star',
  },
};

export const Large: Story = {
  args: {
    Size: 'Large',
    Value: 'fas fa-heart',
  },
};

export const Success: Story = {
  args: {
    Color: 'Success',
    Value: 'fas fa-check',
  },
};

export const Error: Story = {
  args: {
    Color: 'Error',
    Value: 'fas fa-times',
  },
};

export const Warning: Story = {
  args: {
    Color: 'Warning',
    Value: 'fas fa-exclamation-triangle',
  },
};

export const Spinning: Story = {
  args: {
    Animate: 'Spin',
    Value: 'fas fa-spinner',
  },
};

export const Beating: Story = {
  args: {
    Animate: 'Beat',
    Value: 'fas fa-heart',
    Color: 'Error',
  },
};

export const Fading: Story = {
  args: {
    Animate: 'Fade',
    Value: 'fas fa-star',
    Color: 'Warning',
  },
}; 