import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getAllTodos from "../redux/actions/get-all-todos";
import Todo from "../components/todo";
import updateTodo from "../redux/actions/update-todo";
import deleteTodo from "./../redux/actions/delete-todo";

const AllTodos = () => {
  const allTodos = useSelector((state) => state) || [];
  const dispatch = useDispatch();

  const todoCompleteHandler = (data, id) => {
    dispatch(updateTodo(data, id));
  };

  const todoDeleteHandler = (data, id) => {
    dispatch(deleteTodo(data, id));
  };

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  console.log(allTodos);
  return (
    <div className="flex flex-col gap-3 w-full">
      {allTodos.length > 0 &&
        allTodos.map((todo) => (
          <Todo
            key={todo._id}
            data={todo}
            todoCompleteHandler={todoCompleteHandler}
            todoDeleteHandler={todoDeleteHandler}
            completed={todo.completed}
          />
        ))}
    </div>
  );
};

export default AllTodos;
