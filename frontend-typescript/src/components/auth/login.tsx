import { FC, FormEvent, useRef, useState } from "react";
import Button from "./button";
import Input from "./input";
import { useCookies } from "react-cookie";
import useError from "../../hooks/use-error";

type LoginCredentials = {
  username: string;
  password: string;
};

const Login: FC = () => {
  // ref
  const [_, setCookies] = useCookies(["jwt", "username"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { error, setErrorsFn } = useError();

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const fetchLoginToken = async (loginCred: LoginCredentials) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_TODO_LIST_API}api/user/login`,
        {
          method: "POST",
          body: JSON.stringify(loginCred),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.status === "failed") {
        throw new Error(data.message);
      }

      setCookies("jwt", data.token, { path: "/", maxAge: 864000 });
      setCookies("username", data.username, { path: "/", maxAge: 864000 });
    } catch (err) {
      setErrorsFn((err as Error).message);
    }
  };

  const loginHandler = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const username: string = usernameRef.current?.value ?? "";
      const password: string = passwordRef.current?.value ?? "";
      if (!username || !password) return;

      const loginCred: LoginCredentials = {
        username,
        password,
      };
      setIsLoading(true);
      await fetchLoginToken(loginCred);
      (usernameRef.current as HTMLInputElement).value = "";
      (passwordRef.current as HTMLInputElement).value = "";
      setIsLoading(false);
      // setCookies("jwt", data.token);
      // location.reload();
    } catch (err) {
      setErrorsFn((err as Error).message);
    }
  };

  return (
    <form onSubmit={loginHandler} className="w-full bg-slate-700 px-6 py-10">
      {isLoading && <p>LOADING...</p>}
      {error.error && (
        <p className="text-center bg-red-400 text-gray-900">
          {error.errorText}
        </p>
      )}
      <Input
        name="username"
        label={"Username"}
        inputType="text"
        placeholder="Enter your username"
        required={true}
        ref={usernameRef}
      />
      <Input
        name="password"
        label={"Password"}
        inputType="password"
        placeholder="Enter your password"
        required={true}
        ref={passwordRef}
      />
      <Button name="Login" />
    </form>
  );
};

export default Login;
