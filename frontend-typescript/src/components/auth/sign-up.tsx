import { FC, FormEvent, SetStateAction, useRef, useState } from "react";
import Input from "./input";
import Button from "./button";
import { useCookies } from "react-cookie";
import useError from "../../hooks/use-error";

type SignupCredentials = {
  username: string;
  password: string;
  passwordConfirm: string;
};

const Signup: FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setErrorsFn, error } = useError();

  const [_, setCookies] = useCookies(["jwt", "username"]);

  const fetchSignupToken = async (signupCred: SignupCredentials) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_TODO_LIST_API}api/user/signup`,
        {
          method: "POST",
          body: JSON.stringify(signupCred),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Username already exists");
      const data = await res.json();

      if (!data.token) throw new Error("No Token Found");

      setCookies("jwt", data.token, { path: "/", maxAge: 864000 });
      setCookies("username", data.username, { path: "/", maxAge: 864000 });
    } catch (err) {
      setErrorsFn((err as Error).message);
    }
  };

  const signupHandler = async (e: FormEvent) => {
    e.preventDefault();
    const username: string = usernameRef.current?.value ?? "";
    const password: string = passwordRef.current?.value ?? "";
    const passwordConfirm: string = passwordConfirmRef.current?.value ?? "";
    if (!username || !password) return;

    if (!(password === passwordConfirm)) {
      setErrorsFn("Passwords doesn't match!");
      return;
    }

    const signupCred: SignupCredentials = {
      username,
      password,
      passwordConfirm,
    };

    setIsLoading(true);
    await fetchSignupToken(signupCred);
    (usernameRef.current as HTMLInputElement).value = "";
    (passwordRef.current as HTMLInputElement).value = "";
    (passwordConfirmRef.current as HTMLInputElement).value = "";
    setIsLoading(false);
  };

  return (
    <form onSubmit={signupHandler} className="w-full bg-slate-700 px-6 py-10">
      {error.error && (
        <p className="text-center bg-red-400 text-gray-900">
          {error.errorText}
        </p>
      )}
      <Input
        inputType="text"
        name="username"
        label="Username"
        placeholder="Enter your username"
        required={true}
        ref={usernameRef}
      />
      <Input
        inputType="password"
        name="password"
        label="Password"
        placeholder="Password must contain atleast 6 characters"
        required={true}
        ref={passwordRef}
      />
      <Input
        inputType="password"
        name="password-confirm"
        label="Confirm Password"
        placeholder="Re-Enter your password"
        required={true}
        ref={passwordConfirmRef}
      />

      <Button name={"Sign up"} />
    </form>
  );
};

export default Signup;
