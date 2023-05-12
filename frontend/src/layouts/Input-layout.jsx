import { useRef } from "react";
import { useDispatch } from "react-redux";
import addNewTodo from "../redux/actions/add-new-todo";

const InputLayout = () => {
  const formLabelInputClasses = "flex flex-col gap-1";
  const labelClasses = "font-bold";
  const inputClasses = "text-gray-800 outline-none border border-yellow-700 rounded-md px-1";

  const dispatch = useDispatch();
  const todoNameRef = useRef();
  const todoDescriptionRef = useRef();

  const createTodoHandler = () => {
    const name = todoNameRef.current.value || "";
    const description = todoDescriptionRef.current.value || "";
    console.log(name, description);
    dispatch(addNewTodo({ name, description }));
  };

  return (
    <div className="px-8 py-6 bg-slate-700">
      <form>
        <div className="flex gap-16 items-center">
          <div className="flex gap-3">
            <div className={formLabelInputClasses}>
              <label className={labelClasses}>Name:</label>
              <input type="text" ref={todoNameRef} className={inputClasses} />
            </div>
            <div className={formLabelInputClasses}>
              <label className={labelClasses}>Description:</label>
              <input
                type="text"
                ref={todoDescriptionRef}
                className={inputClasses}
              />
            </div>
          </div>
          <button className="p-2 px-4 rounded-full bg-yellow-600" type="button" onClick={() => createTodoHandler()}>
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputLayout;
