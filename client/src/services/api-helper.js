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
    return resp.data.movies;
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

export const createMovie = async movieData => {
  try {
    const response = await apiClient.post("/movies", movieData);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getMovieId = async title => {
  try {
    const response = await apiClient.get(`/movies/title/?title=${title}`);
    return response.data.id;
  } catch (e) {
    return "nomovie";
  }
};

export const likeMovie = async movieId => {
  try {
    let userId = localStorage.getItem("userId");
    const resp = await apiClient.get(`/users/${userId}`);
    let movies = resp.data.movies;
    let movieIn = false;
    movies.forEach(movie => {
      if (movie.id === movieId) {
        movieIn = true;
      }
    });
    if (!movieIn) {
      const response = await apiClient.post(`/likes/${userId}/${movieId}`);
      return response;
    } else {
      console.log("you already like that movie!");
    }
  } catch (e) {
    throw e;
  }
};

export const writeComment = async commentData => {
  try {
    commentData.user_id = localStorage.getItem("userId");
    const response = await apiClient.post("/comments", {
      comment: commentData
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
