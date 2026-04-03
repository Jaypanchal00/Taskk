import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// Auth services
export const loginUser = async (username, password, expiresInMins = 1440) => {
  const { data } = await api.post("/auth/login", { username, password, expiresInMins });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

// Products
export const getProducts = async (limit = 10, skip = 0) => {
  const { data } = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export default api;
