const { getTokens } = require("../utils/authStore");
const { app } = require("./authController");

export const addInvoice = async (data) => {
  return await app.post("/invoices/", data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const addInvoicePayment = async (path) => {
  return await app.post(
    `/invoices/${path}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getTokens()}`,
      },
    }
  );
};
export const deleteInvoicePayment = async (path) => {
  return await app.delete(`/invoices/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const getUserInvoices = async (path) => {
  return await app.get(`/invoices/user/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const getAdminInvoices = async (path) => {
  return await app.get(`/invoices/${path}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
export const editInvoice = async (uuid, data) => {
  return await app.patch(`/invoices/${uuid}`, data, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};

export const deleteInvoice = async (uuid) => {
  return await app.delete(`/invoices/${uuid}`, {
    headers: {
      Authorization: `Bearer ${getTokens()}`,
    },
  });
};
