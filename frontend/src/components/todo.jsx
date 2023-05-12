import { memo } from "react";

const Todo = ({ data, todoCompleteHandler, todoDeleteHandler, completed }) => {
  console.log(data.completed);

  const buttonClasses = "text-sm bg-white px-3 py-1 rounded-full border";

  return (
    <div className="flex justify-between items-center p-4 bg-slate-700">
      {/* flex padd*/}
      <div className="flex flex-col">
        {/* flex flex-col padd*/}
        <p
          className={
            `${completed ? "line-through text-slate-400" : "text-yellow-500 "}
            font-bold text-2xl` 
          }
        >
          {data.name}
        </p>
        <p className={`${completed ? "line-through text-slate-400" : ""} text-sm`}>
          {data.description}
        </p>
      </div>
      <div className="flex gap-3">
        {!completed && (
          <button className={`${buttonClasses} text-green-500 border-green-500`}
            onClick={() =>
              todoCompleteHandler(
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

export default memo(Todo, (prev, curr) => {
  console.log(prev, curr);
  return prev === curr;
});
