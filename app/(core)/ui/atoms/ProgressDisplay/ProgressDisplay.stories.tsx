import type { Meta, StoryObj } from "@storybook/react";
import ProgressDisplay from "./ProgressDisplay";

const meta = {
  title: "atoms/ProgressDisplay",
  component: ProgressDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ProgressDisplay>;

export default meta;

type Story = StoryObj<typeof ProgressDisplay>;

export const Primary: Story = {
  args: {
    progress: 34,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};
