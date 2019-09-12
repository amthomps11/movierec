import axios from "axios";
const BASE_URL = "http://localhost:3000";

const JWT_TOKEN = localStorage.getItem("token");

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`
  }
});

export const showFavesOfUser = async userId => {
  try {
    const resp = await apiClient.get(`/users/${userId}`);
    console.log(resp.data.movies);
    return resp;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async loginData => {
  try {
    let resp = await apiClient.post(
      `/auth/login?username=${loginData.username}&password=${loginData.password}`
    );
    return resp;
  } catch (e) {
    throw e;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/app/profile");
    const { user } = response.data;
    return user;
  } catch (e) {
    throw e;
  }
};

export const signUp = async data => {
  try {
    const response = await apiClient.post("/auth/signup", data);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (e) {
    throw e;
  }
};
