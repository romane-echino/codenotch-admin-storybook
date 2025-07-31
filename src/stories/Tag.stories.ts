import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../components/globals/Tag';
import { toAUMLCode } from '../utils/StoriesUtils';
import { DefaultColorPaletteNames } from '../utils/DefaultColorPalette';

const meta = {
  title: 'Globals/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    Label: { control: 'text', description: 'The text content of the tag', table: { type: { summary: 'string' } } },
    Color: { 
      control: 'select', 
      options: DefaultColorPaletteNames,
      description: 'The color variant of the tag', 
      table: { type: { summary: 'string' } } 
    },
  },
  args: {
    Label: 'Tag Label',
    Color: 'Gray',
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Tag', {
          Label: 'Tag Label',
          Color: 'Primary',
          Size: 'Normal'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithColorAndIcon: Story = {
  args: {
    Label: 'Success',
    Color: 'Emerald',
    Icon: 'far fa-check',
    IconPlacement: 'Left',
  },
};

export const WithColorAndRightIcon: Story = {
  args: {
    Color: 'Alizarin',
    Label: 'Error',
    Icon: 'far fa-times-circle',
    IconPlacement: 'Right',
  },
};
export const WithLightColor: Story = {
  args: {
    Color: 'PeterRiver',
    Label: 'Light Tag',
    Light: true,
  },
};