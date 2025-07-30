import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from '../components/inputs/Form';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Layouts/Form',
    component: Form,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        declareFunction: { table: { disable: true } },
        onPropertyChanged: { table: { disable: true } },
        childrenProps: { table: { disable: true } },
        Modal: { table: { disable: true } },
        HasLayout: { control: 'boolean', table: { category: 'Layout' } },
        OnChange: { action: 'onChange', table: { category: 'Events' } },
        Title: { control: 'text' },
        Subtitle: { control: 'text' },

    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {

    },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
    args: {
    },
};