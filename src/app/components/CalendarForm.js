"use client";
import React, { useState } from "react";
import { emails } from "../data";

const CalendarForm = ({ onSubmit, onFormSubmit }) => {
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSelection = (event) => {
    const selectedEmail = event.target.value;
    setEmailAddresses((prevEmailAddresses) => {
      const updatedEmailAddresses = [...prevEmailAddresses];
      const emailIndex = updatedEmailAddresses.indexOf(selectedEmail);
      if (emailIndex === -1) {
        updatedEmailAddresses.push(selectedEmail);
      } else {
        updatedEmailAddresses.splice(emailIndex, 1);
      }
      return updatedEmailAddresses;
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmails = emails.filter((email) =>
    email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleOptionChange = (event) => {
    setOptionValue(event.target.value);
  };

  const handleClearEmails = () => {
    setEmailAddresses([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit Clicked");
    if (
      optionValue === "" ||
      emailAddresses.length === 0 ||
      startDate === "" ||
      endDate === ""
    ) {
      setFormError(
        "Please select an option, at least one email address, start date, and end date."
      );
    } else {
      setFormError("");
      setLoading(true);
      const formData = {
        emailAddresses,
        startDate,
        endDate,
        optionValue,
      };
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Data retrieved");
        onSubmit(data);
        onFormSubmit();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[45%] mx-auto">
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium font-lato mb-1">
          Email Addresses:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full border border-gray-300 rounded p-2 text-black font-lato "
        />
        <select
          id="email"
          multiple
          onChange={handleEmailSelection}
          className="block w-full border border-gray-300 rounded p-2 text-black font-lato mt-2"
        >
          {filteredEmails.map((email, index) => (
            <option
              value={email}
              key={email}
              className={`${index !== 0 ? "border-t border-gray-300" : ""}`}
            >
              {email}
            </option>
          ))}
        </select>
        <div className="mt-2 text-sm font-lato text-white">
          Calendars Included: {emailAddresses.join(", ")} <br />
          <button
            type="button"
            className="mt-1 text-sm text-[#dcf763] font-lato underline"
            onClick={handleClearEmails}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block font-medium font-lato mb-1">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          className="block w-full border border-gray-300 rounded p-2 text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block font-medium font-lato mb-1">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          className="block w-full border border-gray-300 rounded p-2 text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="option" className="block font-medium mb-1">
          Option:
        </label>
        <div className="flex items-center">
          <input
            type="radio"
            id="option30"
            name="option"
            value="30"
            checked={optionValue === "30"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          <label htmlFor="option30" className="mr-4">
            30 min
          </label>
          <input
            type="radio"
            id="option60"
            name="option"
            value="60"
            checked={optionValue === "60"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          <label htmlFor="option60">60 min</label>
        </div>
      </div>
      {formError && <div className="mb-4 text-red-500">{formError}</div>}
      {loading ? (
        <div className="font-lato mb-4">Loading...</div>
      ) : (
        <button
          className="bg-transparent border-2 border-white text-white font-lato font-bold py-2 px-4 rounded shadow-lg"
          type="submit"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default CalendarForm;
