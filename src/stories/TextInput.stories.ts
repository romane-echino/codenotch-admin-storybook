import type { Meta, StoryObj } from '@storybook/react-vite';


import { TextInput } from '../components/TextInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/TextInput',
  component: TextInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    Placeholder: { control: 'text' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    Placeholder: 'Enter text here',

  },
};

export const Secondary: Story = {
  args: {
    Placeholder: 'Another text input',
  },
};

export const Large: Story = {
  args: {
    Placeholder: 'Large text input',
    Value: 'This is a large text input',
  },
};

export const Small: Story = {
  args: {
    Placeholder: 'Small text input',
    Value: 'Short',
  },
};
