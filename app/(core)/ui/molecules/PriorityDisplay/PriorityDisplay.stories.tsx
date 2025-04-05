import type { Meta, StoryObj } from "@storybook/react";
import PriorityDisplay from "./PriorityDisplay";

const meta = {
  title: "atoms/PriorityDisplay",
  component: PriorityDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PriorityDisplay>;

export default meta;

type Story = StoryObj<typeof PriorityDisplay>;

export const Primary: Story = {
  args: {
    priority: 2,
  },
};
