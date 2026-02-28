// import { Dispatch } from "redux";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { FormTodo } from "../../types/new-todo";
import { ActionsObj } from "../../types/todo-obj";

const addNewTodo: (
  todoObj: FormTodo,
  token: string,
  navigate: NavigateFunction,
) => (dispatch: Dispatch<ActionsObj>) => void =
  (todoObj, token, navigate) => async (dispatch) => {
    const response = await fetch(
      `${import.meta.env.VITE_TODO_LIST_API}/api/todo`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoObj),
      },
    );
    const { data } = await response.json();

    dispatch({ type: "ADD_NEW_TODO", payload: data });
    navigate("/", { replace: true });
  };
export default addNewTodo;
