import type { Meta, StoryObj } from "@storybook/react";
import TicketCard from "./TicketCard";
import { TicketType } from "@/app/(types)/Ticket";

const ticket: TicketType = {
  _id: "61b0a0c8c0b1d1a1b2a3",
  title: "Ticket Title",
  description: "Ticket Description",
  category: "Hardware Problem",
  priority: 1,
  progress: 0,
  status: "no started",
  createdAt: "2023-03-01T00:00:00.000Z",
};

const meta = {
  title: "organisms/TicketCard",
  component: TicketCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TicketCard>;

export default meta;

type Story = StoryObj<typeof TicketCard>;

export const Primary: Story = {
  args: {
    ticket,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
};
