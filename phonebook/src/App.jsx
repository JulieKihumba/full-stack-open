import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";


const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [personsToShow, setPersonsToShow] = useState(persons);

  
  const addPerson = (name, number) => {
    const nameExists = persons.some((person) => person.name === name);
    const numberExists = persons.some((person) => person.number === number);
    if (nameExists) {
      alert(`${name} is already added to phonebook`);
      return false;
    }
    if (numberExists) {
      alert(`${number} is already added to phonebook`);
      return false;
    }

    const personObject = {
      name: name,
      number: number,
    };
    setPersons(persons.concat(personObject));
    return true;
  };

  const handleFilter = (filterValue) => {
    const filtered = filterValue
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        )
      : persons;
    setPersonsToShow(filtered);
  };

  return (
    <div>
      <h1>PHONEBOOK</h1>
      <Filter onFilter={handleFilter} />

      <h2>Add a new: </h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
