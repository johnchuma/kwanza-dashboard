const Switch = ({ isActive }) => {
  return (
    <div className="flex items-center">
      <label
        className={`flex items-center cursor-pointer w-12 h-6 bg-gray-200 rounded-full transition duration-200 ease-in-out ${
          isActive ? "bg-green-400" : ""
        }`}
      >
        <span
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
            isActive ? "translate-x-6" : ""
          }`}
        ></span>
      </label>
    </div>
  );
};

export default Switch;
