const express = require("express");
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getOneTodo,
} = require("../Controller/todo-controller");

const router = express.Router();

router.route("/").get(getAllTodos).post(createTodo);
router.route("/:id").get(getOneTodo).delete(deleteTodo).patch(updateTodo);

module.exports = router;
