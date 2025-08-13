import { Dispatch } from "redux";
import { UpdateTodoObj } from "../../types/action-function-type";

const updateTodo: (
  newTodoData: UpdateTodoObj,
  id: string,
  token: string
) => (dispatch: Dispatch) => void =
  (newTodoData, id, token) => async (dispatch) => {
    const response = await fetch(
      `${import.meta.env.VITE_TODO_LIST_API}/api/todo/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodoData),
      }
    );
    const { data } = await response.json();

    dispatch({ type: "UPDATE_TODO", id, payload: data });
  };

export default updateTodo;
