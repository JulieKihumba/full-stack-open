import React from "react";

const Filter = ({ onFilter }) => {

  const handleFilterChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div>
      filter shown with <input type="text" onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
