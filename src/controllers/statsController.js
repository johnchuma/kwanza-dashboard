const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const getAdminStats = async () => {
  return await app.get(`/stats/admin/`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const getDSPCampaignStats = async (path) => {
  return await app.get(`/stats/dsp-campaign/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getSSPCampaignStats = async (path) => {
  return await app.get(`/stats/ssp-campaign/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
