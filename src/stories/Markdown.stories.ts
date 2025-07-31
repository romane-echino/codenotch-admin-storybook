import type { Meta, StoryObj } from '@storybook/react-vite';
import { Markdown } from '../components/globals/Markdown';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Globals/Markdown',
  component: Markdown,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'The markdown content', table: { type: { summary: 'string' } } },

  },
  args: {
    children: '# Hello World\n\nThis is a **markdown** component with *formatting*.\n\n- List item 1\n- List item 2\n- List item 3'
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Markdown', {
          children: '# Hello World\n\nThis is a **markdown** component with *formatting*.\n\n- List item 1\n- List item 2\n- List item 3'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Markdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Documentation: Story = {
  args: {
    children: `# Component Documentation

## Overview
This component provides a simple way to render markdown content.

## Usage
\`\`\`jsx
<Markdown Content="# Hello World" />
\`\`\`

## Features
- **Bold text** support
- *Italic text* support
- [Link](https://example.com) support
- Code blocks
- Lists

### Code Example
\`\`\`javascript
const example = "Hello World";
console.log(example);
\`\`\`
`
  },
};

export const Simple: Story = {
  args: {
    children: 'This is a simple markdown text with **bold** and *italic* formatting.'
  },
};

export const List: Story = {
  args: {
    children: `# Shopping List

## Groceries
- Milk
- Bread
- Eggs
- Butter

## Electronics
1. Laptop
2. Mouse
3. Keyboard
4. Monitor

## Notes
> Remember to check prices before buying!
`
  },
}; 