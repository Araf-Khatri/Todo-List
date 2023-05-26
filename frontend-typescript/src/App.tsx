import { useCookies } from "react-cookie";
import "./App.css";
import TodoList from "./Todo-list";
import AuthPage from "./layouts/Auth-page";
import { Fragment } from "react";
import Navbar from "./layouts/navbar";

const App = () => {
  const [cookie] = useCookies(["jwt"]);

  return (
    <div
      className={`flex flex-col${
        !cookie.jwt ? " items-center px-1 py-10" : ""
      } gap-14 bg-gray-900 text-gray-50 min-h-screen`}
    >
      {cookie.jwt ? <Navbar /> : <Fragment></Fragment>}
      {!cookie.jwt ? <AuthPage /> : <TodoList />}
    </div>
  );
};

export default App;
