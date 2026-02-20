import React from "react";
import Notes from "./components/Notes";

const App = () => {
  const notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true,
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true,
    },
  ];

  return (
    <div>
      <h1>Notes</h1>
      <Notes notes={notes} />
    </div>
  );
};

export default App;
