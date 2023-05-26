const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A Todo should belong to a User"],
  },
  name: {
    type: String,
    minLength: [1, "A heading must not be empty"],
    required: [true, "A Todo must have a name"],
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
});

TodoSchema.pre(/^find/, function (next) {
  this.select("-userId");
  next()
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
