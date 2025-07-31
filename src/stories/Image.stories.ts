import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from '../components/layouts/Image';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    Source: { control: 'text', description: 'The image source URL', table: { type: { summary: 'string' } } },
    AlternativeText: { control: 'text', description: 'The image alt text', table: { type: { summary: 'string' } } },
    Rounded: { control: 'boolean', description: 'Whether the image is rounded', table: { type: { summary: 'boolean' } } },
  },
  args: {
    Source: 'https://via.placeholder.com/300x200',
    AlternativeText: 'Sample Image',
    Rounded: false
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Image', {
          Src: 'https://via.placeholder.com/300x200',
          Alt: 'Sample Image',
          Width: 300,
          Height: 200
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Square: Story = {
  args: {
    Source: 'https://via.placeholder.com/200x200',
    AlternativeText: 'Square Image',
  },
};

export const SquareAndRounded: Story = {
  args: {
    Source: 'https://via.placeholder.com/200x200',
    AlternativeText: 'Square Image',
    Rounded: true,
  },
};

export const Portrait: Story = {
  args: {
    Source: 'https://via.placeholder.com/200x300',
    AlternativeText: 'Portrait Image',
    Rounded: false,
  },
};

export const Landscape: Story = {
  args: {
    Source: 'https://via.placeholder.com/400x200',
    AlternativeText: 'Landscape Image',
  },
}; 