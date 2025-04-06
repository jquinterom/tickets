import { render, screen } from "@testing-library/react";
import PriorityDisplay from "./PriorityDisplay";

describe("PriorityDisplay", () => {
  it("should render", () => {
    render(<PriorityDisplay priority={3} />);
    const element = screen.getByTestId("priority-display");
    expect(element).toBeInTheDocument();
  });
});
