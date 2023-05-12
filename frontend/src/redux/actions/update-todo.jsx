const updateTodo = (newTodoData, id) => async (dispatch) => {
  const response = await fetch(`http://127.0.0.1:8080/api/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodoData),
  });
  const { data } = await response.json();

  dispatch({ type: "UPDATE_TODO", id, payload: data });
};

export default updateTodo;
