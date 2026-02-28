import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import AuthPage from "./layouts/Auth-page";
import Navbar from "./layouts/navbar";
import CreateTodo from "./pages/CreateTodo";
import ListTodo from "./pages/ListTodo";

const App = () => {
  const [cookie] = useCookies(["jwt"]);

  return (
    <div
      className={`flex flex-col${
        !cookie.jwt ? " items-center px-1 py-10" : ""
      } gap-14 bg-gray-900 text-gray-50 min-h-screen`}
    >
      {!cookie.jwt ? (
        <AuthPage />
      ) : (
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="" element={<ListTodo />} />
            <Route path="create" element={<CreateTodo />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
