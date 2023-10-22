import axios from "axios";

const config = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
};
const api = axios.create(config);

export default api;
