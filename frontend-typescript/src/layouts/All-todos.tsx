import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import getAllTodos from "../redux/actions/get-all-todos";
import Todo from "../components/todo";
import updateTodo from "../redux/actions/update-todo";
import deleteTodo from "../redux/actions/delete-todo";
import { TodoObj } from "../types/todo-obj";
import { UpdateTodoObj } from "../types/action-function-type";
import { useTypedDispatch } from "../redux/store";
import { ReactCookieProps, withCookies } from "react-cookie";

// const useAppDispatch: (arg?: unknown) => AppDispatch = useDispatch;
const AllTodos: FC<ReactCookieProps> = ({ cookies }) => {
  const token: string = cookies?.get("jwt");

  const allTodos =
    useSelector<TodoObj[], TodoObj[]>((state: TodoObj[]) => state) || [];

  const dispatch = useTypedDispatch();

  const todoCompleteHandler = (data: UpdateTodoObj, id: string) => {
    dispatch(updateTodo(data, id, token));
  };

  const todoDeleteHandler = (id: string) => {
    dispatch(deleteTodo(id, token));
  };

  useEffect(() => {
    dispatch(getAllTodos(token));
  }, [dispatch, token]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-3xl font-bold border-b-[1px] text-gray-400 border-b-gray-700">Your ToDo's</p>
      {allTodos.length > 0 &&
        allTodos.map((todo) => (
          <Todo
            key={todo._id}
            data={todo}
            todoUpdateHandler={todoCompleteHandler}
            todoDeleteHandler={todoDeleteHandler}
            completed={todo.completed}
          />
        ))}
    </div>
  );
};

const AllTodosWithCookies = withCookies(AllTodos);
export default AllTodosWithCookies;
