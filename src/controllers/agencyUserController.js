const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addAgencyUser = async (data) => {
  return await app.post("/agency-users/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAgencyUsers = async (path) => {
  return await app.get(`/agency-users/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteAgency = async (uuid) => {
  return await app.delete(`/agency-users/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
