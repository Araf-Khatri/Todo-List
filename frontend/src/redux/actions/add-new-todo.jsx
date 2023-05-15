console.log(import.meta.env.VITE_TODO_LIST_API)
const addNewTodo = (todoObj) => async (dispatch) => {
  // process.env.REACT_APP_TODO_LIST_API
  const response = await fetch(`${import.meta.env.VITE_TODO_LIST_API}api/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoObj),
  });
  const { data } = await response.json();

  dispatch({ type: "ADD_NEW_TODO", payload: data });
};
export default addNewTodo;
