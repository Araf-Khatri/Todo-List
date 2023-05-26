const jwt = require("jsonwebtoken");
const Todo = require("../Model/todo-model");

exports.createTodo = async (req, res) => {
  try {
    const { userId } = req.userData;

    const todo = await Todo.create({ ...req.body, userId });

    res.status(201).json({
      status: "success",
      data: {
        _id: todo._id,
        name: todo.name,
        description: todo.description,
        completed: todo.completed,
      },
    });
  } catch (err) {
    res.status(406).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const { userId } = req.userData;

    const todos = await Todo.find({ userId });
    // console.log(todos);

    res.status(200).json({
      status: "success",
      length: todos.length,
      data: todos,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.getOneTodo = async (req, res) => {
  try {
    const { userId } = req.userData;

    const { id } = req.params;
    const todo = await Todo.find({ _id: id, userId }).select("-__v -userId");

    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (err) {
    if (err.name === "CastError") {
      res.status(404).json({
        status: "Failed",
        message: "You got no Todo with ID: " + req.params.id,
      });
    }
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { userId } = req.userData;

    const { id } = req.params;
    await Todo.findOneAndDelete({ _id: id, userId });

    res.status(204).json({
      status: "success",
      id,
    });
  } catch (err) {
    if (err.name === "CastError") {
      res.status(404).json({
        status: "Failed",
        message: "No Todo Found with this ID: " + req.params.id,
      });
    }
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    let todo = await Todo.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    }).select("-__v");

    if (!todo) {
      throw new Error("Invalid Todo ID");
    }
    todo = await todo.save({ validateBeforeSave: true });

    res.status(202).json({
      status: "success",
      data: todo,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
