const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
});

const reminderSchema = new Schema({
  receiver: String,
  email: String,
  address: String,
  phone: String,
  medicine: String,
  mode: String,
  interval: Number,
  status: Boolean,
});
const userModel = new mongoose.model("users", userSchema);
const reminderModel = new mongoose.model("reminders", reminderSchema);

module.exports = { userModel };
