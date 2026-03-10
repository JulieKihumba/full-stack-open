import React, { useState } from "react";

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addPerson(newName, newNumber);

    //resets the value of the input field to empty string after adding a name
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label>Phone Number: </label>
          <input type="text" value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PersonForm;
