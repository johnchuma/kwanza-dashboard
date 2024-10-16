const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addAgency = async (data) => {
  return await app.post("/agencies/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAgencies = async (path) => {
  return await app.get(`/agencies/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAgency = async (uuid) => {
  return await app.patch(`/agencies/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editAgency = async (uuid, data) => {
  return await app.patch(`/agencies/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteAgency = async (uuid) => {
  return await app.delete(`/agencies/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
