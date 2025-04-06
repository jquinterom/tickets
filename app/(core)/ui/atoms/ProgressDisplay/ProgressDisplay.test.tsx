import { render, screen } from "@testing-library/react";
import ProgressDisplay from "./ProgressDisplay";

describe("ProgressDisplay", () => {
  it("should render", () => {
    render(<ProgressDisplay progress={50} />);

    const element = screen.getByTestId("progress-display");
    expect(element).toBeInTheDocument();
  });
});
