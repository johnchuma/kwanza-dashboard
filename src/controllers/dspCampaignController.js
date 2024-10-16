const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addDSPCampaign = async (data) => {
  return await app.post("/dsp-campaigns/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getDSPCampaigns = async (path) => {
  return await app.get(`/dsp-campaigns/user/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getDSPCampaign = async (uuid) => {
  return await app.patch(`/dsp-campaigns/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editDSPCampaign = async (uuid, data) => {
  return await app.patch(`/dsp-campaigns/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteDSPCampaign = async (uuid) => {
  return await app.delete(`/dsp-campaigns/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
