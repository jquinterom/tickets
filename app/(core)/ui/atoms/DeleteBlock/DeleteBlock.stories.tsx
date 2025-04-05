import type { Meta, StoryObj } from "@storybook/react";
import DeleteBlock from "./DeleteBlock";

const meta = {
  title: "atoms/DeleteBlock",
  component: DeleteBlock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DeleteBlock>;

export default meta;

type Story = StoryObj<typeof DeleteBlock>;

export const Primary: Story = {
  args: {
    id: "61b0a0c8c0b1d1a1b2a3",
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
