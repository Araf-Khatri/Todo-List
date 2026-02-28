import { FC, useState } from "react";
import { UpdateTodoObj } from "../types/action-function-type";
import { TodoObj } from "../types/todo-obj";

type EditTodoDialogProps = {
  data: TodoObj;
  onUpdate: (data: UpdateTodoObj, id: string) => void;
  onClose: () => void;
};

const EditTodoDialog: FC<EditTodoDialogProps> = ({ data, onUpdate, onClose }) => {
  const [editName, setEditName] = useState(data.name);
  const [editDescription, setEditDescription] = useState(data.description);

  const formLabelInputClasses = "flex flex-col gap-1";
  const labelClasses = "font-bold";
  const inputClasses =
    "text-gray-800 outline-none border border-yellow-700 rounded-sm p-1 w-full";

  const handleUpdateTodo = () => {
    if (!editName || !editDescription) return;
    onUpdate({ name: editName, description: editDescription }, data._id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 w-full">
          <p className="text-3xl font-bold border-b-[1px] text-gray-400 border-b-gray-700">
            Edit Todo
          </p>
          <form className="w-full max-w-xl self-center">
            <div className="flex flex-col gap-10 items-center h-fit px-6 py-8 bg-slate-700">
              <div className="flex flex-col gap-3 w-full">
                <div className={formLabelInputClasses}>
                  <label className={labelClasses}>Name:</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div className={formLabelInputClasses}>
                  <label className={labelClasses}>Description:</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  className="flex-1 p-2 px-5 rounded-md bg-gray-600 font-bold hover:bg-gray-500 transition-colors"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 p-2 px-5 rounded-md bg-yellow-600 font-bold hover:bg-yellow-500 transition-colors"
                  type="button"
                  onClick={handleUpdateTodo}
                >
                  Update Todo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodoDialog;
