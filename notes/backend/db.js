const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://kihumbajulie58_db_user:${password}@ac-zddxiyy-shard-00-00.l23cbod.mongodb.net:27017,ac-zddxiyy-shard-00-01.l23cbod.mongodb.net:27017,ac-zddxiyy-shard-00-02.l23cbod.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-k926o3-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

//schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});
//model
const Note = mongoose.model("Note", noteSchema);
//creating object
// const note = new Note({
//   content: "HTML is Easy",
//   important: false,
// });
//saving object
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
//fetching objects from the database
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
