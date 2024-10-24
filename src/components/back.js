import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="flex space-x-2 items-center mb-4 text-muted dark:text-white dark:text-opacity-50 hover:text-primary font-semibold cursor-pointer"
      >
        <AiOutlineArrowLeft /> <h1>Go back</h1>
      </button>
    </div>
  );
};

export default Back;
