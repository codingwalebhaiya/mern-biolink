import axios from "axios";

const API = axios.create({
  baseURL: "/api/v1", // your backend base URL attack through vite proxy
});

// Attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  //  token && (req.headers.Authorization = `Bearer ${token}`);// alternative way
  return req;
});

export default API;
