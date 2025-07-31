import type { Meta, StoryObj } from '@storybook/react-vite';
import { GroupCalendar } from '../components/globals/GroupCalendar';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Globals/GroupCalendar',
  component: GroupCalendar,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {

  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('GroupCalendar', {
          Events: [
            {
              id: '1',
              title: 'Team Meeting',
              date: new Date('2024-01-15'),
              time: '10:00 AM',
              participants: ['John', 'Jane', 'Bob']
            },
            {
              id: '2',
              title: 'Project Review',
              date: new Date('2024-01-16'),
              time: '2:00 PM',
              participants: ['Alice', 'Charlie']
            }
          ]
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof GroupCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    
  },
};
