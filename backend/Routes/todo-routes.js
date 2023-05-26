const express = require("express");
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getOneTodo,
} = require("../Controller/todo-controller");
const { protect } = require("../Controller/auth-controller");

const router = express.Router();

router.use(protect)
router.route("/:id").get(getOneTodo).delete(deleteTodo).patch(updateTodo);
router.route("/").get(getAllTodos).post(createTodo);


module.exports = router;
