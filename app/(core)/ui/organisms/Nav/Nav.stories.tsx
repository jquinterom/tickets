import type { Meta, StoryObj } from "@storybook/react";
import Nav from "./Nav";

const meta = {
  title: "organisms/Nav",
  component: Nav,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Nav>;

export default meta;

type Story = StoryObj<typeof Nav>;

export const Primary: Story = {
  args: {
    priority: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};
