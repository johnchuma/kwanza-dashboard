const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addAudience = async (data) => {
  return await app.post("/audiences/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAudiences = async (path) => {
  return await app.get(`/audiences/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getPretargetedAudiences = async () => {
  return await app.get(`/audiences/pretargets/`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAudience = async (uuid) => {
  return await app.patch(`/audiences/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editAudience = async (uuid, data) => {
  return await app.patch(`/audiences/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteAudience = async (uuid) => {
  return await app.delete(`/audiences/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
