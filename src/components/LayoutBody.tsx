"use client";
import { ReactElement, ReactNode, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import Sidebar from "./sidebar/Sidebar";
import clsx from "clsx";
import HomeHeader from "./headers/HomeHeader";

const LayoutBody = ({ children }: { children: ReactNode }): ReactElement => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);

  return (
    <div className="h-screen w-full flex overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={clsx(
          "h-full border-r border-[#e5f3ff] bg-white transition-all duration-300 hidden lg:block",
          {
            "w-64": toggleSidebar, // Open sidebar width
            "w-0 border-none": !toggleSidebar, // Collapsed sidebar
          }
        )}
      >
        {toggleSidebar && <Sidebar type="sidebar" />}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <HomeHeader />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg bg-white border border-gray-300 transition-all duration-300 hidden lg:flex",
          {
            "left-64": toggleSidebar,
            "left-2": !toggleSidebar,
          }
        )}
        onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        {toggleSidebar ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
      </button>
    </div>
  );
};

export default LayoutBody;
