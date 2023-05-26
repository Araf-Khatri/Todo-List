import { FC } from "react";
import { ReactCookieProps, withCookies } from "react-cookie";

const Navbar: FC<ReactCookieProps> = ({ cookies }) => {
  const logoutHandler = () => {
    cookies?.set("username", "", { path: "/", maxAge: 1 });
    cookies?.set("jwt", "", { path: "/", maxAge: 1 });
  };
  return (
    <div className="p-2 bg-gray-700">
      <div className="flex justify-between mx-[5%] xl:mx-44">
        <p className="text-lg font-bold">Hey {cookies?.get("username")}</p>
        <button
          onClick={() => logoutHandler()}
          className="text-base font-bold rounded-sm p-1 px-3 bg-gray-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

const NavbarWithCookies = withCookies(Navbar);
export default NavbarWithCookies;
