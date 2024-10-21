const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const getSettings = async () => {
  return await app.get(`/settings/`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const updateSetting = async (data) => {
  return await app.patch(`/settings/`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
