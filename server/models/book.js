const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

//model is actually collection in the database
module.exports = mongoose.model("Book", bookSchema);
