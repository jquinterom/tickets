import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TicketForm from "./TicketForm";
import { TicketType } from "@/app/(types)/Ticket";
import { useRouter } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock fetch global
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

const newTicket: TicketType = {
  _id: "new",
  title: "Existing Ticket",
  description: "Existing Description",
  category: "Hardware Problem",
  priority: 3,
  progress: 50,
  status: "started",
};

const existingTicket: TicketType = {
  _id: "123",
  title: "Existing Ticket",
  description: "Existing Description",
  category: "Hardware Problem",
  priority: 3,
  progress: 50,
  status: "started",
};

describe("TicketForm", () => {
  const mockRouter = {
    push: jest.fn(),
    refresh: jest.fn(),
  };

  describe("Create Mode", () => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
      jest.clearAllMocks();
    });

    it("should render in create mode", () => {
      render(<TicketForm ticket={newTicket} />);

      expect(screen.getByText("Create Your Ticket")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Create Ticket" })
      ).toBeInTheDocument();
    });

    it("should submit new ticket form", async () => {
      render(<TicketForm ticket={newTicket} />);

      // Rellenar el formulario
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "New Ticket", name: "title" },
      });
      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: "Description", name: "description" },
      });
      fireEvent.change(screen.getByLabelText("Category"), {
        target: { value: "Software Problem", name: "category" },
      });
      fireEvent.click(screen.getByLabelText("1")); // Prioridad
      fireEvent.change(screen.getByLabelText("Status"), {
        target: { value: "started", name: "status" },
      });

      // Enviar el formulario
      fireEvent.submit(
        screen.getByTestId("ticket-form").querySelector("form")!
      );

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("/api/Tickets", {
          method: "POST",
          body: JSON.stringify({
            formData: {
              title: "New Ticket",
              description: "Description",
              category: "Software Problem",
              priority: 1,
              progress: 0,
              status: "started",
            },
          }),
        });
        expect(mockRouter.refresh).toHaveBeenCalled();
        expect(mockRouter.push).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("Edit Mode", () => {
    it("should render in edit mode with existing data", () => {
      render(<TicketForm ticket={existingTicket} />);

      expect(screen.getByText("Edit Your Ticket")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Existing Ticket")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Existing Description")
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue("Hardware Problem")).toBeInTheDocument();
      expect(screen.getByLabelText("3")).toBeChecked();
      expect(screen.getByDisplayValue("50")).toBeInTheDocument();
      expect(screen.getByText("Started")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Update Ticket" })
      ).toBeInTheDocument();
    });

    it("should submit updated ticket form", async () => {
      render(<TicketForm ticket={existingTicket} />);

      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "Updated Title", name: "title" },
      });

      fireEvent.click(screen.getByLabelText("4"));

      fireEvent.submit(
        screen.getByTestId("ticket-form").querySelector("form")!
      );

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith("/api/Tickets/123", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData: {
              title: "Updated Title",
              description: "Existing Description",
              category: "Hardware Problem",
              priority: 4,
              progress: 50,
              status: "started",
              _id: "123",
            },
          }),
        });
        expect(mockRouter.refresh).toHaveBeenCalled();
        expect(mockRouter.push).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("Form Validation", () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ ok: false })
      );

      jest.clearAllMocks();
    });

    const newTicket: TicketType = {
      _id: "new",
      title: "",
      description: "Existing Description",
      category: "Hardware Problem",
      priority: 3,
      progress: 50,
      status: "started",
    };

    it("should require all fields", async () => {
      render(<TicketForm ticket={newTicket} />);

      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "", name: "title" },
      });

      fireEvent.submit(
        screen.getByTestId("ticket-form").querySelector("form")!
      );

      await waitFor(() => {
        expect(fetch).not.toHaveBeenCalled();
        expect(screen.getByLabelText("Title")).toHaveAttribute("required");
        expect(screen.getByLabelText("Description")).toHaveAttribute(
          "required"
        );
      });
    });

    it("should convert priority to number", () => {
      render(<TicketForm ticket={newTicket} />);

      fireEvent.click(screen.getByLabelText("2"));

      expect(screen.getByLabelText("2")).toBeChecked();
    });
  });

  describe("Error Handling", () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: "Server error" }),
      });
    });

    it("should handle create error", async () => {
      render(<TicketForm ticket={newTicket} />);

      // Fill required fields
      fireEvent.change(screen.getByLabelText("Title"), {
        target: { value: "Title", name: "title" },
      });
      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: "Desc", name: "description" },
      });
      fireEvent.change(screen.getByLabelText("Category"), {
        target: { value: "Software Problem", name: "category" },
      });

      fireEvent.submit(
        screen.getByTestId("ticket-form").querySelector("form")!
      );

      await waitFor(() => {
        const error = screen.getByTestId("error");
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe("Failed to create ticket");
      });

      expect(mockRouter.push).not.toHaveBeenCalled();
      expect(mockRouter.refresh).not.toHaveBeenCalled();
    });

    it("should handle update error", async () => {
      render(<TicketForm ticket={existingTicket} />);

      // Send the form
      fireEvent.submit(
        screen.getByTestId("ticket-form").querySelector("form")!
      );

      await waitFor(() => {
        const error = screen.getByTestId("error");
        expect(error).toBeInTheDocument();
        expect(error.textContent).toBe("Failed to update ticket");
      });

      expect(mockRouter.push).not.toHaveBeenCalled();
      expect(mockRouter.refresh).not.toHaveBeenCalled();
    });
  });
});
