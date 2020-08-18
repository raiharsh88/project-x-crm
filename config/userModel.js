const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
});

const userModel = new mongoose.model("users", userSchema);

module.exports = { userModel };
