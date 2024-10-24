import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ title, icon, path, onClick }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          navigate(path);
        }
      }}
      className={`flex space-x-3 rounded-lg px-4 items-center py-[10px] w-full ${
        pathname == path &&
        " bg-activeBackground  dark:bg-black dark:bg-opacity-30 hover:bg-opacity-75"
      } hover:bg-lightBackground dark:hover:bg-black dark:hover:bg-opacity-30   transition-all duration-200`}
    >
      <div
        className={`text-xl   ${
          pathname == path
            ? "text-primary"
            : " text-muted dark:text-white dark:text-opacity-50"
        }`}
      >
        {icon}
      </div>
      <h1
        className={`font-semibold text-base ${
          pathname == path
            ? "text-dark dark:text-white"
            : " text-muted dark:text-white dark:text-opacity-50  dark:text-opacity-75"
        } `}
      >
        {title}
      </h1>
    </button>
  );
};

export default SidebarItem;
