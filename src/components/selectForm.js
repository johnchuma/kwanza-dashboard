const SelectForm = ({
  label,
  placeholder,
  name,
  defaultValue,
  options,
  values,
}) => {
  values = values || options;
  return (
    <div className="flex flex-col space-y-1 text-base  w-full">
      <label className="text-muted dark:text-mutedLight dark:text-white">
        {label || ""}
      </label>
      <select
        required
        name={name}
        defaultValue={defaultValue}
        className="input-style"
        placeholder={placeholder || ""}
      >
        {options.map((item, index) => {
          return <option value={values[index]}>{item}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectForm;
