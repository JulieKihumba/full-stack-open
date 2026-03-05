import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());

//Define a custom Morgan token for the body
morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});
//Use the custom token in your Morgan log format
app.use(morgan(":method :url :status :response-time ms - :body"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("hello world");
});

//fetching all persons
app.get("/api/persons", (requesst, response) => {
  response.json(persons);
});

//info page to diplay number of entries and time request was made
app.get("/info", (request, response) => {
  const requestTime = new Date(); //time of request
  const count = persons.length; //count entries

  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${requestTime}</p>`);
});

//fetching a single specific person
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

//deleting a person
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

//adding a new person

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return maxId + 1;
};
app.post("/api/persons", (request, response) => {
  const body = request.body;

  //check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  //check if name exists
  const nameExists = persons.find((person) => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  // If validation passes, create the new entry
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  console.log(person);
  response.json(person);
});

//listens for a request
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
