import axios from "axios";

export const app = axios.create({
  baseURL: "http://localhost:5000",
});

export const sendCode = async (data) => {
  return await app.post("/users/auth/send-code", data);
};
export const verifyCode = async (data) => {
  return await app.post("/users/auth/confirm-code", data);
};
