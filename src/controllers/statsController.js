const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const getAdminStats = async () => {
  return await app.get(`/stats/admin/`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getPublisherStats = async (uuid) => {
  return await app.get(`/stats/publisher/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getPublisherRevenueStats = async (uuid) => {
  return await app.get(`/stats/publisher/${uuid}/revenue`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAdvertiserStats = async (uuid) => {
  return await app.get(`/stats/advertiser/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAgencyOverviewStats = async (uuid) => {
  return await app.get(`/stats/agency/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAgencyAdvertisersOverviewStats = async (uuid) => {
  return await app.get(`/stats/agency/${uuid}/advertisers`, {
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
