import axios from "axios";
import { BASE_URL } from "./base-url";

const axiosInstace = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add token to axios instance if it exists in localStorage
const token = localStorage.getItem("auth_token");
if (token) {
  axiosInstace.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstace;
