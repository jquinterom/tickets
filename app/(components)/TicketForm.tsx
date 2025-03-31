"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { TicketType } from "../(types)/Ticket";

const TicketForm = () => {
  const statingTicketData: TicketType = {
    title: "",
    description: "",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
    status: "no started",
    active: false,
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

    setFormDate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const formData = new FormData(e.currentTarget);

    // fetch("/api/route", {
    //   method: "POST",
    //   body: formData,
    // });

    // router.push("/TicketPage");

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

        <label htmlFor="">Progress</label>
        <input
          type="number"
          name="progress"
          id="progress"
          onChange={handleChange}
          required
          value={formData.progress}
        />

        <label htmlFor="">Status</label>
        <select
          name="status"
          id="status"
          onChange={handleChange}
          required
          value={formData.status}
        >
          <option value="no started">No Started</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label htmlFor="">Active</label>
        <input
          type="checkbox"
          name="active"
          id="active"
          onChange={handleChange}
          required
          value={formData.active ? "true" : "false"}
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
