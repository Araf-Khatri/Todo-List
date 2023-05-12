import AllTodos from "./layouts/All-todos";
import InputLayout from "./layouts/Input-layout";

const TodoList = () => {
  return (
    <div className="mx-auto w-fit flex flex-col  gap-4 items-center">
      <p className="text-2xl font-bold">My Todos</p>
      <InputLayout />
      <AllTodos />
    </div>
  );
};

export default TodoList;
