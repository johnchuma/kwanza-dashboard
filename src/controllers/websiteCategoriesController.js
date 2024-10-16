const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addWebsiteCategory = async (data) => {
  return await app.post("/website-categories/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getWebsiteCategories = async () => {
  return await app.get(`/website-categories/`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getWebsiteCategory = async (uuid) => {
  return await app.patch(`/website-categories/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editWebsiteCategory = async (uuid, data) => {
  return await app.patch(`/website-categories/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteWebsiteCategory = async (uuid) => {
  return await app.delete(`/website-categories/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
