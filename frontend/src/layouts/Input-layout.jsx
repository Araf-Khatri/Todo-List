import { useRef } from "react";
import { useDispatch } from "react-redux";
import addNewTodo from "../redux/actions/add-new-todo";

const InputLayout = () => {
  const dispatch = useDispatch();
  const todoNameRef = useRef();
  const todoDescriptionRef = useRef();

  const createTodoHandler = () => {
    const name = todoNameRef.current.value || "";
    const description = todoDescriptionRef.current.value || "";

    dispatch(addNewTodo({ name, description }));
  };

  return (
    <div className="input-layout">
      <form >
        <div className="inputs">
          <div className="form-input">
            <label>Name:</label>
            <input type="text" ref={todoNameRef} />
          </div>
          <div className="form-input">
            <label>Description:</label>
            <input type="text" ref={todoDescriptionRef} />
          </div>
          <button type="button" onClick={() => createTodoHandler()}>
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputLayout;
