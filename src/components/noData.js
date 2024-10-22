import { AiOutlineQuestion } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NoData = ({ title, description, action }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-darkLight rounded-xl py-24 mt-4 ">
      <div className="flex flex-col items-center mt-8">
        <div className="size-24 bg-primary bg-opacity-10 text-5xl text-primary items-center justify-center flex rounded-full">
          <AiOutlineQuestion />
        </div>
        <h1 className="text-xl 2xl:text-lg font-bold text-muted dark:text-mutedLight mt-4">
          {title ?? "No Data"}
        </h1>
        <p className="text-muted text-opacity-60 2xl:text-sm dark:text-mutedLight text-center">
          {description ?? "Your data will be shown here, when available"}{" "}
        </p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
};

export default NoData;
