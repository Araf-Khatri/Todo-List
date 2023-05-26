import { FC } from "react";

type ButtonProps = {
  name: string;
};

const Button: FC<ButtonProps> = ({ name }) => {
  return (
    <button type="submit" className="font-bold bg-yellow-600 w-full p-2 mt-10">
      {name}
    </button>
  );
};

export default Button;
