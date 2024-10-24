const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addSSPCampaign = async (data) => {
  return await app.post("/ssp-campaigns/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getSSPCampaigns = async (path) => {
  return await app.get(`/ssp-campaigns/user/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getSSPCampaign = async (uuid) => {
  return await app.get(`/ssp-campaigns/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editSSPCampaign = async (uuid, data) => {
  return await app.patch(`/ssp-campaigns/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteSSPCampaign = async (uuid) => {
  return await app.delete(`/ssp-campaigns/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
