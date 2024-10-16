const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addSSPCampaignBanner = async (data) => {
  return await app.post("/ssp-campaign-banners/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
      "Content-Type": "multpart/form-data",
    },
  });
};

export const linkWithZone = async (data) => {
  return await app.post("/ssp-campaign-banners/link-with-zone", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const unlinkWithZone = async (data) => {
  return await app.post("/ssp-campaign-banners/unlink-with-zone", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const getSspCampaignBanners = async (path) => {
  return await app.get(`/ssp-campaign-banners/ssp-campaign/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getSSPCampaignBanner = async (uuid) => {
  return await app.patch(`/ssp-campaign-banners/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editSSPCampaignBanner = async (uuid, data) => {
  return await app.patch(`/ssp-campaign-banners/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteSSPCampaignBanner = async (uuid) => {
  return await app.delete(`/ssp-campaign-banners/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
