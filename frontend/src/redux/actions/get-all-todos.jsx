const getAllTodos = () => async (dispatch) => {
  const response = await fetch(`${import.meta.env.VITE_TODO_LIST_API}api/todo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  dispatch({ type: "GET_ALL_TODOS", payload: data });
};

export default getAllTodos;
