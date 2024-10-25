import {
  Bs0Square,
  BsAirplane,
  BsChevronBarDown,
  BsMenuButton,
} from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import SidebarItem from "./sidebarItem";
import { IoPower } from "react-icons/io5";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTokens } from "../utils/authStore";
import { UserContext } from "../layouts/dashboardLayout";
import { closePopupMenu } from "../utils/closePopupMenu";
import { CgMenuLeft } from "react-icons/cg";

const DashboardNavbar = ({ isDark, setIsDark }) => {
  const [showAction, setShowAction] = useState(false);
  const { user, showSidebar, setShowSidebar } = useContext(UserContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowAction(false);
    });
  }, [dropdownRef]);
  return (
    <div className="flex justify-between md:justify-end items-center space-x-5 py-4 z-50">
      <div className="flex items-center space-x-2  ">
        <CgMenuLeft
          onClick={() => {
            setShowSidebar(true);
          }}
          className="text-2xl block md:hidden "
        />
        <h1 className="font-bold text-2xl block md:hidden">Kwanza</h1>
      </div>
      <div className="flex space-x-2 items-center">
        <div className="text-2xl text-muted dark:text-white dark:text-opacity-50 dark:text-white">
          <div
            onClick={() => {
              setIsDark(!isDark);
            }}
            className="text-2xl cursor-pointer -rotate-12 "
          >
            {isDark ? <MdOutlineNightlight /> : <MdOutlineLightMode />}
          </div>
        </div>
        <div className="relative">
          <div
            onClick={() => {
              setShowAction(!showAction);
            }}
            className="flex space-x-2 items-center cursor-pointer"
          >
            <div className="size-10 items-center text-base justify-center flex bg-muted bg-opacity-40 rounded-full font-semibold">
              {user.name.split(" ").map((item) => item[0])}
            </div>
            <FaChevronDown className="text-muted dark:text-white dark:text-opacity-50 dark:text-white text-xs" />
          </div>
          {showAction && (
            <div
              ref={dropdownRef}
              className="bg-white  dark:bg-darkLight   py-5 rounded-lg absolute right-0 w-48 space-y-2 mt-2"
            >
              <div
                onClick={() => {
                  setShowAction(false);
                  navigate("my-account");
                }}
                className="flex space-x-2 items-center hover:bg-lightBackground dark:hover:text-white dark:hover:bg-darkLight py-2 px-4 transition-all duration-150 cursor-pointer text-base font-semibold text-muted dark:text-white dark:text-opacity-50 dark:text-white dark:text-opacity-75"
              >
                <div className="text-xl ">
                  <AiOutlineUser />
                </div>
                <h1>My Account</h1>
              </div>
              <div
                onClick={() => {
                  deleteTokens();
                  setShowAction(false);
                  navigate("/login");
                }}
                className="flex space-x-2 items-center hover:bg-lightBackground dark:hover:text-white dark:hover:bg-darkLight py-2 px-4 transition-all duration-150 cursor-pointer hover:bg- text-base font-semibold text-muted dark:text-white dark:text-opacity-50 dark:text-white dark:text-opacity-75"
              >
                <div className="text-xl ">
                  <IoPower />
                </div>
                <h1>Logout</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
