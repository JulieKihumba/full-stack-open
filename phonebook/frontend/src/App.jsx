import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  const personsToShow = filter
    ? persons.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (newName, newNumber) => {
    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      if (personExists.number === newNumber) {
        alert(`${newName} is already added to phonebook with this number`);
        return;
      }

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const changedPerson = { ...personExists, number: newNumber };

        personsService.update(personExists.id, changedPerson).then((returnedPerson) => {
          setPersons((prev) =>
            prev.map((p) => (p.id !== personExists.id ? p : returnedPerson))
          );
        });
        return;
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(personObject).then((returnedPerson) => {
      setPersons((prev) => [...prev, returnedPerson]);
    });
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>PHONEBOOK</h1>
      <Filter onFilter={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
