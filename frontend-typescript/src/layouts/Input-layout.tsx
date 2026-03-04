import { FC, useRef, useState } from "react";
import { ReactCookieProps, withCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import addNewTodo from "../redux/actions/add-new-todo";
import { useTypedDispatch } from "../redux/store";
import { FormTodo } from "../types/new-todo";

const InputLayout: FC<ReactCookieProps> = ({ cookies }) => {
  const navigate = useNavigate();
  const todoNameRef = useRef<HTMLInputElement | null>(null);
  const todoDescriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useTypedDispatch();

  const token: string = cookies?.get("jwt");

  const formLabelInputClasses = "flex flex-col gap-1";
  const labelClasses = "font-bold";
  const inputClasses =
    "text-gray-800 outline-none border border-yellow-700 rounded-sm p-1 w-full";

  const createTodoHandler = async () => {
    const name: string = todoNameRef.current?.value || "";
    const description: string = todoDescriptionRef.current?.value || "";

    if (!name || !description) return;
    const formTodo: FormTodo = { name, description };

    setLoading(true);
    await dispatch(addNewTodo(formTodo, token, navigate));
    setLoading(false);

    (todoNameRef.current as HTMLInputElement).value = "";
    (todoDescriptionRef.current as HTMLTextAreaElement).value = "";
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-3xl font-bold border-b-[1px] text-gray-400 border-b-gray-700">
        Add Todo
      </p>
      <form className="w-full max-w-xl self-center">
        <div className="flex flex-col gap-10 items-center h-fit px-6 py-8 bg-slate-700">
          <div className="flex flex-col gap-3 w-full">
            <div className={formLabelInputClasses}>
              <label className={labelClasses}>Name:</label>
              <input type="text" ref={todoNameRef} className={inputClasses} />
            </div>
            <div className={formLabelInputClasses}>
              <label className={labelClasses}>Description:</label>
              <textarea ref={todoDescriptionRef} className={inputClasses} />
            </div>
          </div>
          <button
            className="w-full p-2 px-5 rounded-md bg-yellow-600 font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
            disabled={loading}
            onClick={() => createTodoHandler()}
          >
            {loading && <Spinner />}
            {loading ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputLayoutWithCookies = withCookies(InputLayout);

export default InputLayoutWithCookies;

