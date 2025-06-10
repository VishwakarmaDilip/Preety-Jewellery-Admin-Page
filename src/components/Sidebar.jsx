import React, { useContext } from "react";
import * as Icon from "react-feather";
import { sharedContext } from "./Layout";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { sidebar, setSidebar } = useContext(sharedContext);
  const navigate = useNavigate();
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  const handleLogout = () => {
    try {
      fetch(`http://localhost:3000/api/v1/owner/logout`, {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
;
  };
  return (
    <div
      className={`w-56 flex flex-col justify-between items-center bg-white h-screen shadow-xs fixed top-0 py-4 px-2 ${
        sidebar ? "left-0" : "-left-56"
      } transition-all ease-in-out z-10`}
    >
      <div className="flex flex-col gap-7">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-xl text-[#967203]">Preety Jewellery</h1>
          <Icon.ChevronLeft
            onClick={(e) => handleSidebar()}
            className="rounded-full hover:bg-gray-200"
          />
        </div>

        <div>
          <ul>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-theme flex items-center gap-2 mt-5"
                    : "text-gray-500 flex items-center gap-2 mt-5"
                }
              >
                <Icon.Grid size={18} />
                <span className="font-semibold">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/products"}
                className={({ isActive }) =>
                  isActive
                    ? "text-theme flex items-center gap-2 mt-5"
                    : "text-gray-500 flex items-center gap-2 mt-5"
                }
              >
                <Icon.Package size={18} />
                <span className="font-semibold">Products</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* logout */}
      <div>
        <Button
          className={
            "bg-rose-700 hover:bg-rose-800 active:bg-rose-900 flex mt-5"
          }
          onClick={handleLogout}
        >
          <Icon.LogOut className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
