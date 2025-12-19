import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { createContext, useState } from "react";

const sharedContext = createContext();
const Layout = () => {
  let [sidebar, setSidebar] = useState(window.innerWidth >= 640 ? true : false);
  return (
    <sharedContext.Provider value={{ sidebar, setSidebar }}>
      <div className="">
        <Navbar />
        <Sidebar />
        <div
          className={`mt-17 pt-3 ${
            sidebar ? "xs:pl-54" : "pl-0"
          } transition-all ease-in-out h-[90vh] overflow-y-scroll`}
        >
          <Outlet />
        </div>
      </div>
    </sharedContext.Provider>
  );
};

export default Layout;
export { sharedContext };
