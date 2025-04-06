import { render, screen } from "@testing-library/react";
import StatusDisplay from "./StatusDisplay";

describe("StatusDisplay", () => {
  it('should render with "no started" status and red background', () => {
    render(<StatusDisplay status="no started" />);

    const statusElement = screen.getByTestId("status-display");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("bg-red-200");
    expect(statusElement).toHaveTextContent("no started");
  });

  it('should render with "started" status and yellow background', () => {
    render(<StatusDisplay status="started" />);

    const statusElement = screen.getByTestId("status-display");
    expect(statusElement).toHaveClass("bg-yellow-200");
    expect(statusElement).toHaveTextContent("started");
  });

  it('should render with "done" status and green background', () => {
    render(<StatusDisplay status="done" />);

    const statusElement = screen.getByTestId("status-display");
    expect(statusElement).toHaveClass("bg-green-200");
    expect(statusElement).toHaveTextContent("done");
  });

  it("should have all base classes applied", () => {
    render(<StatusDisplay status="no started" />);

    const statusElement = screen.getByTestId("status-display");
    expect(statusElement).toHaveClass(
      "inline-block",
      "rounded-full",
      "px-2",
      "py-1",
      "text-xs",
      "font-semibold",
      "text-gray-700"
    );
  });
});
