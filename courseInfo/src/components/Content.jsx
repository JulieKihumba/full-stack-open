import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
  return (
    <div>
      <ul>
        {course.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </ul>
      <p>Total number of exercises: {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    </div>
  );
};

export default Content;
