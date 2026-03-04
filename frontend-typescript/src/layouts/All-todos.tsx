import { FC, useEffect, useState } from "react";
import { ReactCookieProps, withCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
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
  const [loading, setLoading] = useState(true);

  const allTodos =
    useSelector<TodoObj[], TodoObj[]>((state: TodoObj[]) => state) || [];

  const dispatch = useTypedDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getAllTodos(token)).then(() => setLoading(false));
  }, [dispatch, token]);

  const todoUpdateHandler = (data: UpdateTodoObj, id: string) => {
    return dispatch(updateTodo(data, id, token));
  };

  const todoDeleteHandler = (id: string) => {
    return dispatch(deleteTodo(id, token));
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-3xl font-bold border-b-[1px] text-gray-400 border-b-gray-700">
        Your ToDo's
      </p>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Spinner size="h-10 w-10" />
        </div>
      ) : allTodos.length > 0 ? (
        allTodos.map((todo) => (
          <Todo
            key={todo._id}
            data={todo}
            todoUpdateHandler={todoUpdateHandler}
            todoDeleteHandler={todoDeleteHandler}
            completed={todo.completed}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 py-16">No todos yet. Create one!</p>
      )}
    </div>
  );
};

const AllTodosWithCookies = withCookies(AllTodos);
export default AllTodosWithCookies;

