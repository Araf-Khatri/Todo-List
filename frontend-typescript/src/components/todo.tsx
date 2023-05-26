import { FC, memo } from "react";
import { TodoComponent } from "../types/component-type";

// eslint-disable-next-line react-refresh/only-export-components
const Todo: FC<TodoComponent> = ({
  data,
  todoUpdateHandler,
  todoDeleteHandler,
  completed,
}) => {
  const buttonClasses = "bg-white px-3 py-1 rounded-full border";

  return (
    <div className="flex gap-10 justify-between items-center p-4 bg-slate-700">
      {/* flex padd*/}
      <div className="flex flex-col">
        {/* flex flex-col padd*/}
        <p
          className={`${
            completed ? "line-through text-slate-400" : "text-yellow-500 "
          }
            font-bold text-2xl`}
        >
          {data.name}
        </p>
        <p
          className={`${
            completed ? "line-through text-slate-400" : ""
          } text-sm`}
        >
          {data.description}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row text-xs sm:text-sm gap-3">
        {completed && (
          <button
            className={`${buttonClasses} text-gray-500 border-gray-500`}
            onClick={() =>
              todoUpdateHandler(
                {
                  completed: false,
                },
                data._id
              )
            }
          >
            Undo
          </button>
        )}
        {!completed && (
          <button
            className={`${buttonClasses} text-green-500 border-green-500`}
            onClick={() =>
              todoUpdateHandler(
                {
                  completed: true,
                },
                data._id
              )
            }
          >
            Completed
          </button>
        )}
        <button
          onClick={() => todoDeleteHandler(data._id)}
          className={`${buttonClasses} text-red-500 border-red-500`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const MemoizedTodo = memo(Todo, (prev, curr) => {
  return prev === curr;
});

export default MemoizedTodo;
