const updateTodo = (newTodoData, id) => async (dispatch) => {
  const response = await fetch(
    `${import.meta.env.VITE_TODO_LIST_API}api/todo/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodoData),
    }
  );
  const { data } = await response.json();

  dispatch({ type: "UPDATE_TODO", id, payload: data });
};

export default updateTodo;
