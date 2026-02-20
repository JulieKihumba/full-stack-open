import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addName = (e) => {
    e.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    const numberExists = persons.some((person) => person.number === newNumber);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (numberExists) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h1>PHONEBOOK</h1>
      <div>
        filter shown with <input type="text" onChange={handleFilterChange} />
      </div>
      <h2>Add a new: </h2>
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

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>
            {person.name}- {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
