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

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>HELLO WORLD!</h1>");
});

// fetching all the resources
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// fetching a single resource
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// deleting a resource
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

//generating id that will be + 1 of the the maxId
const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

// adding/receiving new data
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
  };

  notes = notes.concat(note);

  console.log(note);

  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
