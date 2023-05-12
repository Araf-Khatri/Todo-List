const addNewTodo = (todoObj) => async (dispatch) => {
  const response = await fetch("http://127.0.0.1:8080/api/todo", {
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
