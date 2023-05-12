const deleteTodo = (id) => async (dispatch) => {
  const response = await fetch(`http://127.0.0.1:8080/api/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response)
  dispatch({ type: "DELETE_TODO", id });
};

export default deleteTodo;
