import { Bs0Square, BsAirplane, BsChevronBarDown } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import SidebarItem from "./sidebarItem";
import { IoPower } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTokens } from "../utils/authStore";
import { UserContext } from "../layouts/dashboardLayout";
import { closePopupMenu } from "../utils/closePopupMenu";

const DashboardNavbar = ({ isDark, setIsDark }) => {
  const [showAction, setShowAction] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  useEffect(() => {
    closePopupMenu(dropdownRef, () => {
      setShowAction(false);
    });
  }, [dropdownRef]);
  return (
    <div className="flex justify-end items-center space-x-5 py-4 z-50">
      <div className="text-2xl text-muted dark:text-mutedLight dark:text-white">
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
          <FaChevronDown className="text-muted dark:text-mutedLight dark:text-white text-xs" />
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
              className="flex space-x-2 items-center hover:bg-lightBackground dark:hover:text-white dark:hover:bg-darkLight py-2 px-4 transition-all duration-150 cursor-pointer text-base font-semibold text-muted dark:text-mutedLight dark:text-white dark:text-opacity-75"
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
              className="flex space-x-2 items-center hover:bg-lightBackground dark:hover:text-white dark:hover:bg-darkLight py-2 px-4 transition-all duration-150 cursor-pointer hover:bg- text-base font-semibold text-muted dark:text-mutedLight dark:text-white dark:text-opacity-75"
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
  );
};

export default DashboardNavbar;
