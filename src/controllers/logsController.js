const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addLog = async (data) => {
  return await app.post("/logs/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getLogs = async (path) => {
  return await app.get(`/logs/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getLogsStats = async () => {
  return await app.get(`/logs/stats`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getLog = async (uuid) => {
  return await app.patch(`/logs/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editLog = async (uuid, data) => {
  return await app.patch(`/logs/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteLog = async (uuid) => {
  return await app.delete(`/logs/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
