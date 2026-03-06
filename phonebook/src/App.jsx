import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]); // ✅ Fix 1: start as []

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setPersonsToShow(initialPersons); // ✅ this now correctly populates the list
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

        personsService
          .update(personExists.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== personExists.id ? p : returnedPerson,
              ),
            );
          });
      }

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
  };

  const handleFilter = (filterValue) => {
    const filtered = filterValue
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase()),
        )
      : persons;
    setPersonsToShow(filtered);
  };

  const deletePerson = (id) => {
    // ✅ Search in personsToShow instead of persons
    const person = personsToShow.find((p) => p.id === id);

    if (!person) return; // ✅ safety guard

    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      personsService.remove(id).then(() => {
        const updated = persons.filter((p) => p.id !== id);
        setPersons(updated);
        setPersonsToShow(updated); // ✅ update both!
      });
    }
  };

  return (
    <div>
      <h1>PHONEBOOK</h1>
      <Filter onFilter={handleFilter} />

      <h2>Add a new: </h2>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
