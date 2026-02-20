import { useState } from "react";
import Note from "./components/Note";

const App = ({ notes }) => {
  // const [notes, setNotes] = React.useState(notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (e) => {
    e.preventDefault();
    console.log("clicked");
  };
  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, index) => (
          <Note key={index} note={note} />
        ))}
      </ul>
      <form>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit" onClick={addNote}>
          Save
        </button>
      </form>
    </div>
  );
};

export default App;
