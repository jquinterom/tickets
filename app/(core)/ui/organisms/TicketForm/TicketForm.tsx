"use client";

import { TicketType } from "@/app/(types)/Ticket";
import { TicketStatus } from "@/app/(types)/TicketStatus";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TicketFormProps {
  ticket: TicketType;
}

const validFields = (formData: TicketType) => {
  return (
    formData.title.trim() &&
    formData.description.trim() &&
    formData.category.trim()
  );
};

const TicketForm = ({ ticket }: TicketFormProps) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const EDIT_MODE = ticket._id !== "new";

  const statingTicketData: TicketType = {
    title: "",
    description: "",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
    status: "no started",
  };

  if (EDIT_MODE) {
    statingTicketData._id = ticket._id;
    statingTicketData.title = ticket.title;
    statingTicketData.description = ticket.description;
    statingTicketData.category = ticket.category;
    statingTicketData.priority = ticket.priority;
    statingTicketData.progress = ticket.progress;
    statingTicketData.status = ticket.status;
  }

  const [formData, setFormData] = useState(statingTicketData);

  const handleChange = (
    elementEvent:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = elementEvent.target.name;
    const value = elementEvent.target.value;

    if (name === "priority") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateTicket = async () => {
    if (!validFields(formData)) {
      return false;
    }

    const response = await fetch("/api/Tickets", {
      method: "POST",
      body: JSON.stringify({ formData }),
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    return true;
  };

  const handleUpdateTicket = async () => {
    const response = await fetch(`/api/Tickets/${ticket._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update ticket");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      if (EDIT_MODE) {
        await handleUpdateTicket();
      } else {
        const success = await handleCreateTicket();
        if (!success) {
          setError("Please fill all required fields.");
          return;
        }
      }

      router.refresh();
      router.push("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex justify-center" data-testid="ticket-form">
      {error && (
        <p role="alert" data-testid="error">
          {error}
        </p>
      )}

      <form
        className="flex flex-col gap-3 w-10/12 md:w-1/2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h3>{EDIT_MODE ? "Edit" : "Create"} Your Ticket</h3>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          required
          value={formData.title}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={5}
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          onChange={handleChange}
          required
          value={formData.category}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <div className="flex gap-3">
          <div>
            <input
              id="priority-1"
              name="priority"
              type="radio"
              onChange={handleChange}
              required
              value={1}
              checked={formData.priority === 1}
            />
            <label htmlFor="priority-1">1</label>
          </div>

          <div>
            <input
              id="priority-2"
              name="priority"
              type="radio"
              onChange={handleChange}
              required
              value={2}
              checked={formData.priority === 2}
            />
            <label htmlFor="priority-2">2</label>
          </div>

          <div>
            <input
              id="priority-3"
              name="priority"
              type="radio"
              onChange={handleChange}
              required
              value={3}
              checked={formData.priority === 3}
            />
            <label htmlFor="priority-3">3</label>
          </div>

          <div>
            <input
              id="priority-4"
              name="priority"
              type="radio"
              onChange={handleChange}
              required
              value={4}
              checked={formData.priority === 4}
            />
            <label htmlFor="priority-4">4</label>
          </div>

          <div>
            <input
              id="priority-5"
              name="priority"
              type="radio"
              onChange={handleChange}
              required
              value={5}
              checked={formData.priority === 5}
            />
            <label htmlFor="priority-5">5</label>
          </div>
        </div>

        <label htmlFor="progress">Progress: {formData.progress}%</label>
        <input
          type="range"
          name="progress"
          id="progress"
          required
          value={formData.progress}
          min={0}
          max={100}
          onChange={handleChange}
        />

        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          onChange={handleChange}
          required
          value={formData.status}
        >
          <option value={TicketStatus["no started"]}>No Started</option>
          <option value={TicketStatus.started}>Started</option>
          <option value={TicketStatus.done}>Done</option>
        </select>

        <input
          className="btn"
          type="submit"
          value={`${EDIT_MODE ? "Update" : "Create"} Ticket`}
        />
      </form>
    </div>
  );
};

export default TicketForm;
