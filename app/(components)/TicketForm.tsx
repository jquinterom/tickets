"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TicketType } from "../(types)/Ticket";
import { TicketStatus } from "../(types)/TicketStatus";

const TicketForm = () => {
  const router = useRouter();
  const statingTicketData: TicketType = {
    title: "",
    description: "",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
    status: TicketStatus["no started"],
  };

  const [formData, setFormDate] = useState(statingTicketData);

  const handleChange = (
    elementEvent:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = elementEvent.target.name;
    const value = elementEvent.target.value;

    if (name === "priority") {
      setFormDate((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }

    setFormDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/Tickets", {
      method: "POST",
      body: JSON.stringify({ formData }),
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    router.refresh();
    router.push("/");

    console.log("formData", formData);
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-10/12 md:w-1/2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h3>Create Your Ticket</h3>
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          required
          value={formData.title}
        />

        <label htmlFor="">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={5}
        />

        <label htmlFor="">Category</label>
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

        <label htmlFor="">Priority</label>
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

        <label htmlFor="">Progress: {formData.progress}%</label>
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

        <label htmlFor="">Status</label>
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

        <input className="btn" type="submit" value={"Create Ticket"} />
      </form>
    </div>
  );
};

export default TicketForm;
