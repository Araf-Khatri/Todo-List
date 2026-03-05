import { FC, memo, useRef, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import useOutsideElementClick from "../hooks/use-outside-element-click";
import { TodoComponent } from "../types/component-type";
import ConfirmationDialog from "./ConfirmationDialog";
import EditTodoDialog from "./EditTodoDialog";

// eslint-disable-next-line react-refresh/only-export-components
const Todo: FC<TodoComponent> = ({
  data,
  todoUpdateHandler,
  todoDeleteHandler,
  completed,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const todoOptionsRef = useRef<HTMLDivElement>(null);

  useOutsideElementClick(todoOptionsRef, () => {
    setOpenDropdown(false);
  });

  const buttonClasses = "bg-white px-3 py-1 rounded-full border";

  const handleEditClick = () => {
    setShowEditDialog(true);
    setOpenDropdown(false);
  };

  return (
    <>
      <div className="flex gap-10 justify-between items-center p-4 bg-slate-700">
        <div className="flex flex-col">
          <p
            className={`${
              completed ? "line-through text-slate-400" : "text-yellow-500 "
            } font-bold text-2xl`}
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
        <div className="flex items-center text-xs sm:text-sm gap-3">
          {completed && (
            <button
              className={`${buttonClasses} text-gray-500 border-gray-500`}
              onClick={() => todoUpdateHandler({ completed: false }, data._id)}
            >
              Undo
            </button>
          )}
          {!completed && (
            <button
              className={`${buttonClasses} text-green-500 border-green-500`}
              onClick={() => todoUpdateHandler({ completed: true }, data._id)}
            >
              Completed
            </button>
          )}
          <div
            ref={todoOptionsRef}
            onClick={() => setOpenDropdown(!openDropdown)}
            className="relative cursor-pointer"
          >
            {/* @ts-expect-error - BiDotsVertical type issue with react-icons */}
            <BiDotsVertical className="h-8 w-8" color="#ffffff" />

            {openDropdown && (
              <div className="absolute right-0 top-full bg-gray-800 text-gray-50 rounded-md flex flex-col p-2 gap-2 z-10 min-w-[100px]">
                <button
                  onClick={handleEditClick}
                  className={`${buttonClasses} text-blue-500 border-blue-500`}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setOpenDropdown(false);
                  }}
                  className={`${buttonClasses} text-red-500 border-red-500`}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditDialog && (
        <EditTodoDialog
          data={data}
          onUpdate={todoUpdateHandler}
          onClose={() => setShowEditDialog(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmationDialog
          title="Delete Todo"
          message={`Are you sure you want to delete "${data.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={() => todoDeleteHandler(data._id)}
          onClose={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
};

const MemoizedTodo = memo(Todo, (prev, curr) => {
  return prev === curr;
});

export default MemoizedTodo;
