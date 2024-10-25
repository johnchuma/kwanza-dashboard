import { AiOutlineArrowRight } from "react-icons/ai";

const OverviewItem = ({ icon, value, label, action, actionTitle }) => {
  return (
    <div>
      <div className="bg-white dark:bg-darkLight w-full  rounded-xl  ">
        <div className="flex space-x-2 px-5 py-3 items-center">
          <div className="w-4/12">
            <div className="size-12 md:size-16 rounded-full bg-primary bg-opacity-10 flex justify-center items-center text-2xl text-primary">
              {icon}
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl 2xl:text-2xl font-semibold">{value}</h1>
            <p className="text-muted line-clamp-1 dark:text-white dark:text-opacity-50 text-base 2xl:text-sm">
              {label}
            </p>
          </div>
        </div>
        <div className="border-t border-muted border-opacity-30 py-2 px-5 text-base 2xl:text-sm  ">
          <div
            onClick={() => {
              action();
            }}
            className="flex items-center translate-all duration-200 space-x-3 cursor-pointer text-muted dark:text-white dark:text-opacity-50 hover:text-primary"
          >
            <h1 className="">{actionTitle} </h1>
            <AiOutlineArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewItem;
