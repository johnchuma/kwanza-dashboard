const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const getMyInfo = () => {
  return app.get("/users/me", {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editUserInfo = (uuid, data) => {
  return app.patch(`/users/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const getUsers = (path) => {
  return app.get(`/users/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getPublishers = (path) => {
  return app.get(`/users/publishers/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getAdvertisers = (path) => {
  return app.get(`/users/advertisers/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getInfluencers = (path) => {
  return app.get(`/users/influencers/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const registerUser = (data) => {
  return app.post(`/users/`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
