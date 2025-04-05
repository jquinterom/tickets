import type { Meta, StoryObj } from "@storybook/react";
import StatusDisplay from "./StatusDisplay";

const meta = {
  title: "atoms/StatusDisplay",
  component: StatusDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof StatusDisplay>;

export default meta;

type Story = StoryObj<typeof StatusDisplay>;

export const NoStarted: Story = {
  args: {
    status: "no started",
  },
};

export const Started: Story = {
  args: {
    status: "started",
  },
};

export const Done: Story = {
  args: {
    status: "done",
  },
};
