const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addWebsite = async (data) => {
  return await app.post("/websites/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getWebsites = async (path) => {
  return await app.get(`/websites/user/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getWebsite = async (uuid) => {
  return await app.patch(`/websites/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editWebsite = async (uuid, data) => {
  return await app.patch(`/websites/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteWebsite = async (uuid) => {
  return await app.delete(`/websites/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
