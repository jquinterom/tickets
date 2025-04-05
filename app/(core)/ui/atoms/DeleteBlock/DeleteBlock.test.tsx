import { render, screen, fireEvent } from "@testing-library/react";
import DeleteBlock from "./DeleteBlock";
import { useRouter } from "next/navigation";

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

describe("DeleteBlock Component", () => {
  const mockRouter = {
    refresh: jest.fn(),
  };

  let deleteButton: HTMLElement;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();

    render(<DeleteBlock id="test-id" />);
    deleteButton = screen.getByTestId("delete-button");
  });

  it("should render the delete icon", () => {
    // Verifica que el icono se renderice
    expect(deleteButton).toBeInTheDocument();
  });

  it("should call delete API when clicked", async () => {
    fireEvent.click(deleteButton);

    // Verifica que fetch fue llamado correctamente
    expect(fetch).toHaveBeenCalledWith(
      "/api/Tickets/test-id",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  it("should refresh router after successful deletion", async () => {
    fireEvent.click(deleteButton);

    // Espera a que se resuelvan las promesas
    await Promise.resolve();

    // Verifica que refresh fue llamado
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});
