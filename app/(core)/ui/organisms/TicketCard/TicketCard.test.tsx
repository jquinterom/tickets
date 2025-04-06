import { render, screen } from "@testing-library/react";
import TicketCard from "./TicketCard";
import { TicketType } from "@/app/(types)/Ticket";
import { formatTimeStamp } from "@/app/(utils)/formatTimeStamp";

const mockTicket: TicketType = {
  _id: "1",
  title: "Ticket title",
  description: "Ticket description",
  priority: 3,
  status: "no started",
  createdAt: new Date().toDateString(),
  category: "Category",
  progress: 50,
};

// Mock de next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock de fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe("TicketCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<TicketCard ticket={mockTicket} />);
  });

  it("should render", () => {
    const element = screen.getByTestId("ticket-card");
    expect(element).toBeInTheDocument();
  });

  it("should render the correct date", () => {
    const formatDate = formatTimeStamp(mockTicket.createdAt);
    const dateElement = screen.getByText(formatDate);
    expect(dateElement).toBeInTheDocument();
  });
});
