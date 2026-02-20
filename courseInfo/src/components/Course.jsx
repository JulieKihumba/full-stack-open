import React from "react";
import Content from "./Content";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course, index) => (
        <Content key={index} course={course} />
      ))}
      <h4>
        TOTAL:
        {courses.reduce(
          (total, course) =>
            total + course.parts.reduce((sum, part) => sum + part.exercises, 0),
          0,
        )}
      </h4>
    </div>
  );
};

export default Course;
