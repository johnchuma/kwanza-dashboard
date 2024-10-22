const TextForm = ({
  label,
  placeholder,
  onChange,
  required,
  name,
  defaultValue,
  onClick,
  value,
  disabled,
  inputType,
}) => {
  return (
    <div className="flex flex-col space-y-1 text-base  w-full">
      <label className="text-muted  dark:text-white">{label || ""}</label>
      <input
        required={required ?? true}
        type={inputType || "text"}
        name={name}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
        value={value}
        disabled={disabled || false}
        defaultValue={defaultValue}
        className="input-style"
        placeholder={placeholder || ""}
      />
    </div>
  );
};

export default TextForm;
