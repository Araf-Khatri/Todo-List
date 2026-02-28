import { FC, useEffect } from "react";
import { ReactCookieProps, withCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Todo from "../components/todo";
import deleteTodo from "../redux/actions/delete-todo";
import getAllTodos from "../redux/actions/get-all-todos";
import updateTodo from "../redux/actions/update-todo";
import { useTypedDispatch } from "../redux/store";
import { UpdateTodoObj } from "../types/action-function-type";
import { TodoObj } from "../types/todo-obj";

// const useAppDispatch: (arg?: unknown) => AppDispatch = useDispatch;
const AllTodos: FC<ReactCookieProps> = ({ cookies }) => {
  const token: string = cookies?.get("jwt");

  const allTodos =
    useSelector<TodoObj[], TodoObj[]>((state: TodoObj[]) => state) || [];

  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(getAllTodos(token));
  }, [dispatch, token]);

  const todoUpdateHandler = (data: UpdateTodoObj, id: string) => {
    dispatch(updateTodo(data, id, token));
  };

  const todoDeleteHandler = (id: string) => {
    dispatch(deleteTodo(id, token));
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-3xl font-bold border-b-[1px] text-gray-400 border-b-gray-700">
        Your ToDo's
      </p>
      {allTodos.length > 0 &&
        allTodos.map((todo) => (
          <Todo
            key={todo._id}
            data={todo}
            todoUpdateHandler={todoUpdateHandler}
            todoDeleteHandler={todoDeleteHandler}
            completed={todo.completed}
          />
        ))}
    </div>
  );
};

const AllTodosWithCookies = withCookies(AllTodos);
export default AllTodosWithCookies;
