require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/info", (request, response) => {
  const count = persons.length;
  const time = new Date().toString();
  const infoContent = `
    <h1>Phonebook Info</h1>
    <p>Phonebook has ${count} entries.</p>
    <p>${time}</p>
  `;
  response.send(infoContent);
});

//getting all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((notes) => response.json(notes));
});

//getting one person
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((note) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

//receiving/ adding a new person
app.post("/api/persons", (request, response) => {
  const body = request.body;

  //check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  person.save().then((savedPerson) => response.json(savedPerson));
});

// deleting a person
app.delete("/api/persons/:id", (request, response) => {
  Person.findOneAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
