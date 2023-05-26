import { FC, useState } from "react";
import Login from "../components/auth/login";
import Signup from "../components/auth/sign-up";

interface Delegation extends React.MouseEvent<HTMLDivElement> {
  target: HTMLElement;
}

const AuthPage: FC = () => {
  const [auth, setAuth] = useState<"LOGIN" | "SIGNUP">("LOGIN");

  const switchAuthHandler = (e: Delegation) => {
    if (!e.target.closest("button")) return;

    const text: string | undefined = e.target.textContent
      ?.split(" ")
      .join("")
      .toUpperCase();

    if (!text) return;

    setAuth(text as "LOGIN" | "SIGNUP");
  };

  return (
    <div className="flex flex-col items-center max-w-lg w-full">
      <div
        onClick={switchAuthHandler}
        className="flex justify-around w-full font-bold "
      >
        {auth === "SIGNUP" ? (
          <button className={`w-full p-2 shadow-active shadow-yellow-500`}>
            Sign up
          </button>
        ) : (
          <button className={`w-full p-2`}>Sign up</button>
        )}

        {auth === "LOGIN" ? (
          <button className={`w-full p-2 shadow-active shadow-yellow-500`}>
            Login
          </button>
        ) : (
          <button className={`w-full p-2`}>Login</button>
        )}
      </div>

      {auth === "LOGIN" ? <Login /> : <Signup />}
    </div>
  );
};

export default AuthPage;
