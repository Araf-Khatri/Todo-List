import { FC } from "react";
import AllTodos from "./layouts/All-todos";
import InputLayout from "./layouts/Input-layout";

const TodoList: FC = () => {
  return (
    <div className="grid gap-10 lg:grid-cols-layout mx-[5%] xl:mx-44 py-10">
      {/* <p className="text-2xl font-bold">My Todos</p> */}
      <InputLayout />
      <AllTodos />
    </div>
  );
};

export default TodoList;
