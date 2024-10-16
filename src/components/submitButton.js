import Spinner from "./spinner";

const SubmitButton = ({ text, loading }) => {
  return (
    <div>
      <button
        type="submit"
        className="bg-primary  h-12 flex justify-center items-center  transition-all w-48 rounded-xl font-semibold mt-4 text-white hover:bg-opacity-85  "
      >
        {loading ? <Spinner /> : text}
      </button>
    </div>
  );
};

export default SubmitButton;
