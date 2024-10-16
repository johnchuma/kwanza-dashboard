const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addZone = async (data) => {
  return await app.post("/zones/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getZones = async (path) => {
  return await app.get(`/zones/website/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const getBannerZones = async (path) => {
  return await app.get(`/zones/banner/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const getZoneBanners = async (path) => {
  return await app.get(`/zones/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const getZone = async (uuid) => {
  return await app.patch(`/zones/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const editZone = async (uuid, data) => {
  return await app.patch(`/zones/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteZone = async (uuid) => {
  return await app.delete(`/zones/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
