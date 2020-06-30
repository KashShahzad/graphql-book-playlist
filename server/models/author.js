const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

//model is actually collection in the database
module.exports = mongoose.model("Author", authorSchema);
