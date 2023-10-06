import axios from "axios";

// control API request flow
const apiClient = () => {
  const token = localStorage.getItem("accessToken");
  const headers = {
    "Content-Type": "application/json",
    "X-auth-token": `${token}`,
  };

  const instance = axios.create({
    baseURL: process.env.SERVER_API_URL,
    responseType: "json",
    headers,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("Api error catched by axios interceptor", error);
    }
  );
  return instance;
};

export default apiClient;
