import React, { useState } from "react";

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (e) => {
    e.preventDefault();
    
    const success = addPerson(newName, newNumber);
    
    if (success) {
      //resets the value of the input field to empty string after adding a name
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <form>
        <div>
          <label>Name: </label>
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label>Phone Number: </label>
          <input
            type="number"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <button type="submit" onClick={addName}>
          Save
        </button>
      </form>
    </div>
  );
};

export default PersonForm;
