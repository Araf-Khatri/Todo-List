const getAllTodos = () => async (dispatch) => {
  const response = await fetch("http://127.0.0.1:8080/api/todo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  dispatch({ type: "GET_ALL_TODOS", payload: data });
};

export default getAllTodos;
