const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addDSPCampaignBanner = async (data) => {
  return await app.post("/dsp-campaign-banners/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
      "Content-Type": "multpart/form-data",
    },
  });
};

export const linkWithZone = async (data) => {
  return await app.post("/dsp-campaign-banners/link-with-zone", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const unlinkWithZone = async (data) => {
  return await app.post("/dsp-campaign-banners/unlink-with-zone", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const getDSPCampaignBanners = async (path) => {
  return await app.get(`/dsp-campaign-banners/dsp-campaign/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getDSPCampaignBanner = async (uuid) => {
  return await app.patch(`/dsp-campaign-banners/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editDSPCampaignBanner = async (uuid, data) => {
  return await app.patch(`/dsp-campaign-banners/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteDSPCampaignBanner = async (uuid) => {
  return await app.delete(`/dsp-campaign-banners/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
