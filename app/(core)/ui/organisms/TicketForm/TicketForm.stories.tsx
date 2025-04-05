import type { Meta, StoryObj } from "@storybook/react";
import TicketForm from "./TicketForm";
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
  title: "organisms/TicketForm",
  component: TicketForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TicketForm>;

export default meta;

type Story = StoryObj<typeof TicketForm>;

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
      <div style={{ width: "600px", margin: "0 auto" }} className="bg-gray-700">
        <Story />
      </div>
    ),
  ],
};
