import { FC, useState } from "react";
import { ReactCookieProps, withCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/ConfirmationDialog";

const tabs = [
  {
    name: "Todo List",
    redirect: "/",
  },
  {
    name: "Create Todo",
    redirect: "/create",
  },
];

const Navbar: FC<ReactCookieProps> = ({ cookies }) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const logoutHandler = () => {
    cookies?.set("username", "", { path: "/", maxAge: 1 });
    cookies?.set("jwt", "", { path: "/", maxAge: 1 });
  };

  const activeTabIdx = tabs.findIndex(
    (tab) => window.location.pathname === tab.redirect,
  );

  return (
    <>
      <div className="p-2 bg-gray-700">
        <div className="flex justify-between mx-[5%] xl:mx-44">
          <p className="text-lg font-bold">Hey {cookies?.get("username")}</p>
          <div className="flex gap-4">
            <div className="flex gap-2">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.name}
                  className={`text-base font-bold rounded-md p-1 px-3 ${
                    idx === activeTabIdx ? "bg-green-500" : "bg-slate-500"
                  }`}
                  onClick={() => navigate(tab.redirect, { replace: true })}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="text-base font-bold p-1 px-3 bg-red-500 rounded-md"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mx-[5%] xl:mx-44">
        <Outlet />
      </div>

      {showLogoutConfirm && (
        <ConfirmationDialog
          title="Log Out"
          message="Are you sure you want to log out?"
          confirmLabel="Log Out"
          onConfirm={logoutHandler}
          onClose={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
};

const NavbarWithCookies = withCookies(Navbar);
export default NavbarWithCookies;

