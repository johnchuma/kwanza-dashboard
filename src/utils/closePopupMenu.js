export const closePopupMenu = (dropdownRef, closeFunction) => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeFunction();
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
};
