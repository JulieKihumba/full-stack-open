const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

const password = process.argv[2];
const url = `mongodb://kihumbajulie58_db_user:${password}@ac-zddxiyy-shard-00-00.l23cbod.mongodb.net:27017,ac-zddxiyy-shard-00-01.l23cbod.mongodb.net:27017,ac-zddxiyy-shard-00-02.l23cbod.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-k926o3-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model("Note", noteSchema);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
