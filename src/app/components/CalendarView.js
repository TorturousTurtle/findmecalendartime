"use client";
import React, { useState } from "react";
import CalendarForm from "./CalendarForm";
import Results from "./Results";

const CalendarView = () => {
  const [formResults, setFormResults] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (results) => {
    console.log("Results set");
    if (results.length === 0) {
      results.push("No Available Times Found");
    }
    setFormResults(results);
  };
  

  const handleFormSubmitted = () => {
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-5xl text-rapdev-cyan font-bold font-lato mb-8">Find Me Calendar Time</h1>
      <div className="bg-rapdev-green p-4 rounded-lg w-[60%] shadow-2xl">
        <div className="flex">
          <CalendarForm onSubmit={handleFormSubmit} onFormSubmit={handleFormSubmitted} />
          <Results results={formResults} clearData={formSubmitted} />
        </div>
        <p className="font-lato text-white text-center text-sm mt-4">
          In order to get accurate results, you need to share your calendar with the following service account:
        </p>
        <p className="font-lato text-white text-center text-sm">calendaraccount@stellar-market-385817.iam.gserviceaccount.com</p>
      </div>
    </div>
  );
};

export default CalendarView;

