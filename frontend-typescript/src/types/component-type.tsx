import { UpdateTodoObj } from "./action-function-type";
import { TodoObj } from "./todo-obj";

export type TodoComponent = {
  data: TodoObj;
  todoUpdateHandler: (data: UpdateTodoObj, id: string) => void;
  todoDeleteHandler: (id: string) => void;
  completed: boolean;
};
