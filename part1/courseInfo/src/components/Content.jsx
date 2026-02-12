import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <>
      <Part part1={props.part1} exercise1={props.exercise1} />
      <Part part2={props.part2} exercise2={props.exercise2} />
      <Part part3={props.part3} exercise3={props.exercise3} />
    </>
  );
};

export default Content;
