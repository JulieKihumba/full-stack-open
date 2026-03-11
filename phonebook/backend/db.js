const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb://kihumbajulie58_db_user:${password}@ac-zddxiyy-shard-00-00.l23cbod.mongodb.net:27017,ac-zddxiyy-shard-00-01.l23cbod.mongodb.net:27017,ac-zddxiyy-shard-00-02.l23cbod.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-k926o3-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

//schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//model
const Person = mongoose.model("Person", personSchema);

// if password only
if (process.argv.length === 3) {
  //list persons
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

//if password plus name plus number
if (process.argv.length === 5) {
  //create person object
  const person = new Person({
    name: name,
    number: number,
  });

  //save person object
  person.save().then((result) => {
    console.log(`added ${name} ${number} to the phonebook`);
    mongoose.connection.close();
  });
}
