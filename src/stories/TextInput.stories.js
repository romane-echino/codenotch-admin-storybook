import { TextInput } from '../components/inputs/TextInput';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Inputs/TextInput',
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
    args: {},
};
export default meta;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic = {
    args: {},
};
export const FullSample = {
    args: {
        Placeholder: 'ex: John',
        Value: 'John Doe',
        Title: 'First Name',
        Subtitle: 'Enter your first name',
        Icon: 'fad fa-user',
        Helper: 'This is your first name, it will be used in your profile.',
    },
};
export const WithDefaultValue = {
    args: {
        Value: 'Default Value',
        Placeholder: 'Type something...',
    },
};
export const WithSuffix = {
    args: {
        Title: 'Tenant url',
        Subtitle: 'Enter your tenant url',
        Placeholder: 'ex: mytenant',
        Suffix: `.codenotch.com`,
    },
};
