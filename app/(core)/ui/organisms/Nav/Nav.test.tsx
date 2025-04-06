import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import {
  faHome,
  faTicket,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

// Mock de FontAwesomeIcon para simplificar las pruebas
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }: { icon: IconDefinition }) => {
    if (icon === faHome) return <span data-testid="home-icon" />;
    if (icon === faTicket) return <span data-testid="ticket-icon" />;
    return null;
  },
}));

describe("Nav", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Nav />);
  });

  it("should render", () => {
    const element = screen.getByTestId("nav");
    expect(element).toBeInTheDocument();
  });

  it("should render a link to home page (/)", () => {
    const homeLink = screen.getByTestId("home-icon").closest("a");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render a link to ticket page (/TicketPage/new)", () => {
    const ticketLink = screen.getByTestId("ticket-icon").closest("a");
    expect(ticketLink).toBeInTheDocument();
    expect(ticketLink).toHaveAttribute("href", "/TicketPage/new");
  });

  it("should display the user email", () => {
    const emailText = screen.getByText("j@j.com");
    expect(emailText).toBeInTheDocument();
    expect(emailText).toHaveClass("text-default-text");
  });

  it("should have the correct navigation classes", () => {
    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveClass("flex");
    expect(navElement).toHaveClass("justify-between");
    expect(navElement).toHaveClass("bg-nav");
    expect(navElement).toHaveClass("p-4");
  });
});
