const deleteTodo = (id) => async (dispatch) => {
  const response = await fetch(`${import.meta.env.VITE_TODO_LIST_API}api/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response)
  dispatch({ type: "DELETE_TODO", id });
};

export default deleteTodo;
