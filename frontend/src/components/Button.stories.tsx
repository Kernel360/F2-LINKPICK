// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { Meta, StoryObj } from '@storybook/your-framework';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const OnDark: Story = {
  parameters: {},
};
