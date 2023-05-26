import { Dispatch } from "redux";

const deleteTodo =
  (id: string, token: string) => async (dispatch: Dispatch) => {
    await fetch(
      `${import.meta.env.VITE_TODO_LIST_API}api/todo/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "DELETE_TODO", id });
  };

export default deleteTodo;
