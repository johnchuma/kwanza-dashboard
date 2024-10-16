import { toast } from "react-hot-toast";

export const showError = (err) => {
  const message = err.response.data.message;
  toast.error(message);
};
