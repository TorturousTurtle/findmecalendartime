"use client";
import React, { useState, useEffect } from "react";

const Results = ({ results }) => {
  const [textToCopy, setTextToCopy] = useState("");

  useEffect(() => {
    if (results && results.length > 0) {
      setTextToCopy(results.join("\n"));
    } else {
      setTextToCopy("");
    }
  }, [results]);

  return (
    <div className="max-w-[50%] mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Results</h2>
      <textarea
        className="w-full h-[75%] p-2 mb-4 border border-gray-300 text-gray-900 font-lato rounded"
        value={textToCopy}
        readOnly
      />
      <button
        className="bg-blue-500 text-white font-lato font-bold py-2 px-4 rounded"
        onClick={() => navigator.clipboard.writeText(textToCopy)}
      >
        Copy
      </button>
    </div>
  );
};

export default Results;
