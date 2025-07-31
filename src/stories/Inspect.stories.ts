import type { Meta, StoryObj } from '@storybook/react-vite';
import { Inspect } from '../components/debug/Inspect';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Debug/Inspect',
  component: Inspect,
  tags: ['autodocs'],
  argTypes: {
    Source: { control: 'object', description: 'The data source to inspect', table: { type: { summary: 'any' } } },
    Title: { control: 'text', description: 'The inspection title', table: { type: { summary: 'string' } } },
    Subtitle: { control: 'text', description: 'The inspection subtitle', table: { type: { summary: 'string' } } },
  },
  args: {
    Source: {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      active: true,
      preferences: {
        theme: 'dark',
        notifications: true
      }
    },
    Title: 'User Data'
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Inspect', {
          Source: JSON.stringify({
            name: 'John Doe',
            age: 30,
            email: 'john@example.com',
            active: true,
            preferences: {
              theme: 'dark',
              notifications: true
            }
          }),
          Title: 'User Data'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Inspect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const SimpleObject: Story = {
  args: {
    Title: 'Simple Object',
    Source: JSON.stringify({
      id: 1,
      name: 'Product',
      price: 99.99,
      inStock: true
    })
  },
};

export const Array: Story = {
  args: {
    Title: 'Array Data',
    Source: JSON.stringify([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ])
  },
};

export const ComplexObject: Story = {
  args: {
    Title: 'Complex Object',
    Source:JSON.stringify({
      user: {
        id: 123,
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          contact: {
            email: 'john@example.com',
            phone: '+1234567890'
          }
        },
        settings: {
          theme: 'dark',
          language: 'en',
          notifications: {
            email: true,
            push: false,
            sms: true
          }
        }
      },
      metadata: {
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-16T14:45:00Z',
        version: '1.0.0'
      }
    }) 
  },
}; 