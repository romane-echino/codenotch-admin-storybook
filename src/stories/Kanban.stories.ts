import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kanban } from '../components/layouts/Kanban';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Layouts/Kanban',
  component: Kanban,
  tags: ['autodocs'],
  argTypes: {
   
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('Kanban', {
          Columns: [
            {
              id: 'todo',
              title: 'To Do',
              items: [
                { id: '1', title: 'Task 1', description: 'Description for task 1' },
                { id: '2', title: 'Task 2', description: 'Description for task 2' }
              ]
            },
            {
              id: 'in-progress',
              title: 'In Progress',
              items: [
                { id: '3', title: 'Task 3', description: 'Description for task 3' }
              ]
            },
            {
              id: 'done',
              title: 'Done',
              items: [
                { id: '4', title: 'Task 4', description: 'Description for task 4' }
              ]
            }
          ]
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof Kanban>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    
  },
};
