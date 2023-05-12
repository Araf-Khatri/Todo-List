const mongoose = require("mongoose");

const todoModel = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [1, "A heading must not be empty"],
      required: [true, "A Todo must have a name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  }
);

const Todo = mongoose.model("Todo", todoModel);

module.exports = Todo;