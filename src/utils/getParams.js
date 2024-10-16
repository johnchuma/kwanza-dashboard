import { useSearchParams } from "react-router-dom";

// Custom hook to get query params
export const useGetParams = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  return params;
};
