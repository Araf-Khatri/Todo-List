import AllTodos from "./layouts/All-todos";
import InputLayout from "./layouts/Input-layout";

const TodoList = () => {
  return (
    <div className="todo-list">
      <h1>My Todos</h1>
      <InputLayout />
      <AllTodos />
    </div>
  );
};

export default TodoList;
