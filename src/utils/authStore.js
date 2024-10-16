export const saveTokens = (token) => {
  localStorage.setItem("kwanza-access-token", token);
};

export const getTokens = () => {
  return localStorage.getItem("kwanza-access-token");
};

export const deleteTokens = () => {
  localStorage.removeItem("kwanza-access-token");
};
