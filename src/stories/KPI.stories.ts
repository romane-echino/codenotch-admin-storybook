import type { Meta, StoryObj } from '@storybook/react-vite';
import { KPI } from '../components/charts/KPI';
import { toAUMLCode } from '../utils/StoriesUtils';

const meta = {
  title: 'Charts/KPI',
  component: KPI,
  tags: ['autodocs'],
  argTypes: {
    Label: { control: 'text', description: 'The text label for the KPI', table: { category: 'General', type: { summary: 'string' } } },
    Icon: { control: 'text', description: 'The icon to display', table: { category: 'General', type: { summary: 'string' } } },

    Count: { control: 'number', description: 'The KPI value', table: { category: 'Data', type: { summary: 'number' } } },
    Rate: { control: 'number', description: 'The trend percentage', table: { category: 'Data', type: { summary: 'number' } } },
    Unit: { control: 'text', description: 'The unit of measurement', table: { category: 'Data', type: { summary: 'string' } } },

    Title: { control: 'text', description: 'The KPI title', table: { category: 'Layout', type: { summary: 'string' } } },
    Subtitle: { control: 'text', description: 'The KPI subtitle', table: { category: 'Layout', type: { summary: 'string' } } },
    Footer: { control: 'text', description: 'Footer text', table: {  category: 'Layout', type: { summary: 'string' } } },
    Actions: { control: 'object', description: 'Actions to perform on KPI', table: { category: 'Layout', type: { summary: 'Function' } } },
    RowSpan: { control: 'number', description: 'Number of rows to span in a grid layout', table: { category: 'Layout', type: { summary: 'number' } } },
    ColSpan: { control: 'select', description: '', options:['1/2', '1/3', '1/4', '2/3', '3/4', 'full'], table: { category: 'Layout', type: { summary: 'number' } } },

    Modal: { table: { disable: true } },
  },
  args: {
   
  },
  parameters: {
    docs: {
      source: {
        code: toAUMLCode('KPI', {
          Title: 'Total Revenue',
          Count: 50000,
          Subtitle: 'This month',
          Rate: 12.5,
          Unit: 'USD'
        }, 'c'),
      }
    }
  }
} satisfies Meta<typeof KPI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Positive: Story = {
  args: {
    Title: 'Sales Growth',
    Count: 15.2,
    Subtitle: 'vs last month',
    Rate: 15.2,
    Unit: '%'
  },
};

export const Negative: Story = {
  args: {
    Title: 'Error Rate',
    Count: 2.1,
    Subtitle: 'vs target 1%',
    Rate: -5.3,
    Unit: '%'
  },
};

export const Warning: Story = {
  args: {
    Title: 'System Load',
    Count: 78,
    Subtitle: 'Average',
    Rate: 8.7,
    Unit: '%'
  },
};

export const Info: Story = {
  args: {
    Title: 'Active Users',
    Count: 1234,
    Subtitle: 'Online now',
    Rate: 3.2,
    Unit: '%'
  },
};

export const Primary: Story = {
  args: {
    Title: 'Conversion Rate',
    Count: 3.2,
    Subtitle: 'This quarter',
    Rate: 0.5,
    Unit: '%'
  },
}; 