import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from '../components/inputs/TextArea';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    Title: { control: 'text', description: 'The title of the textarea', table: { type: { summary: 'string' } } },
    Subtitle: { control: 'text', description: 'The subtitle of the textarea', table: { type: { summary: 'string' } } },
    Placeholder: { control: 'text', description: 'Placeholder text for the textarea', table: { type: { summary: 'string' } } },
    Value: { control: 'text', description: 'The current value of the textarea', table: { type: { summary: 'string' } } },
    Icon: { control: 'text', description: 'Icon to display in the textarea', table: { type: { summary: 'string' } } },
    Disabled: { control: 'boolean', description: 'Whether the textarea is disabled', table: { type: { summary: 'boolean' } } },
    Helper: { control: 'text', description: 'Helper text for the textarea', table: { type: { summary: 'string' } } },
  },
  args: {
    
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('TextArea', {
          Label: 'Description',
          Value: '',
          Placeholder: 'Enter your text here...',
          Rows: 4,
          Disabled: false
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithTitleAndSubtitle: Story = {
  args: {
    Title: 'Feedback',
    Subtitle: 'Please provide your feedback below:',
    Placeholder: 'Type your feedback here...',
    Value: '',
    Disabled: false,
    Helper: 'Your feedback is important to us!'
  },
};