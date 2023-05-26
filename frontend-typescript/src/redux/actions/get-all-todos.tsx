import { Dispatch } from "redux";

const getAllTodos = (token: string) => async (dispatch: Dispatch) => {
  const response = await fetch(
    `${import.meta.env.VITE_TODO_LIST_API}api/todo`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { data } = await response.json();
  dispatch({ type: "GET_ALL_TODOS", payload: data });
};

export default getAllTodos;
