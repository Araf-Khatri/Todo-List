import { memo } from "react";

const Todo = ({ data, todoCompleteHandler, todoDeleteHandler, completed }) => {
  console.log(data);

  return (
    <div>
      {/* flex padd*/}
      <div>
        {/* flex flex-col padd*/}
        <p className={`${completed ? "completed " : ""}`}>{data.name}</p>
        <p className={`${completed ? "completed " : ""}`}>{data.description}</p>
      </div>
      <div className="buttons">
        <button
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
        <button onClick={() => todoDeleteHandler(data._id)}>Delete</button>
      </div>
    </div>
  );
};

export default memo(Todo, (prev, curr) => prev !== curr);
