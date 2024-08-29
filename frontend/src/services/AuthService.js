import axios from "axios";

const API_URL = "http://localhost:8000/v1/account"; // Thay đổi URL API tùy theo địa chỉ và cổng của API thật

export const checkLogin = () => {
  let jsonData = localStorage.getItem("login");
  if (jsonData) {
    return JSON.parse(jsonData);
  }
  return false;
};

export const checkAdmin = () => {
  let jsonData = localStorage.getItem("login");
  if (jsonData) {
    if (JSON.parse(jsonData).admin === true) return JSON.parse(jsonData);
  }
  return false;
};

// hàm đăng nhập
export const login = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/login`, body);
    return response;
  } catch (error) {
    console.error("Error Login: ", error);
    throw error;
  }
};

// hàm đăng ký
export const register = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/add`, body);
    return response;
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};
