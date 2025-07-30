import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../components/globals/Alert';
import { toAUMLCode } from '../utils/StoriesUtils';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Globals/Alert',
  component: Alert,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    Title: { control: 'text', description: 'The title of the alert', table: { type: { summary: 'string' } } },
    Message: { control: 'text', description: 'The message of the alert', table: { type: { summary: 'string' } } },
    Type: { control: 'select', options: ['Success', 'Error', 'Info', 'Warning'], description: 'The type of the alert', table: { type: { summary: 'string' } } },
    LinkText: { control: 'text', description: 'The text of the link', table: { type: { summary: 'string' } } },
    LinkUrl: { control: 'text', description: 'The URL of the link', table: { type: { summary: 'string' } } },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    Title: 'Alert Title',
    Message: 'This is an alert message.',
    Type: 'Info'
  },

  parameters: {
    docs: {
      source: {
        
        code: toAUMLCode('Alert', {
          Title: 'Alert Title',
          Message: 'This is an alert message.',
          Type: 'Info'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
  },
};

export const Success: Story = {
  args: {
    Type: 'Success',
    Title: 'Operation Successful',
    Message: 'Your operation was completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    Type: 'Warning',
    Title: 'Warning',
    Message: 'This is a warning message.',
  },
};

export const Error: Story = {
  args: {
    Type: 'Error',
    Title: 'Error Occurred',
    Message: 'An error has occurred. Please try again later.',
    LinkText: 'Contact support',
    LinkUrl: '#'
  },
};

export const Info: Story = {
  args: {
    Type: 'Info',
    Title: 'Information',
    Message: 'This is an informational message.',
  },
};



