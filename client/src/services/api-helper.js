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

export const createUser = async userData => {
  try {
    let resp = await apiClient.post(`/users`, userData);
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

export const unlikeMovie = async movieId => {
  try {
    let userId = localStorage.getItem("userId");

    const response = await apiClient.put(
      `/users/unlike?id=${userId}&movie_id=${movieId}`
    );
    return response;
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

export const getComments = async (user_id, movie_id) => {
  try {
    const resp = await apiClient.get(
      `/movies/comments?movie_id=${movie_id}&user_id=${user_id}`
    );
    return resp.data;
  } catch (e) {
    throw e;
  }
};

export const getComment = async (movie_id, comment_id) => {
  try {
    let user_id = await localStorage.getItem("userId");
    const resp = await apiClient.get(
      `/movies/comment?movie_id=${movie_id}&user_id=${user_id}&comment_id=${comment_id}`
    );
    return resp.data;
  } catch (e) {
    throw e;
  }
};

export const deleteComment = async (movie_id, comment_id) => {
  try {
    let user_id = localStorage.getItem("userId");
    await apiClient.delete(
      `/movies/comment_destroy?movie_id=${movie_id}&user_id=${user_id}&comment_id=${comment_id}`
    );
    return "comment Deleted";
  } catch (e) {
    throw e;
  }
};

export const updateComment = async (movie_id, comment_id) => {
  try {
    let user_id = localStorage.getItem("userId");
    await apiClient.put(
      `/movies/comment_update?movie_id=${movie_id}&user_id=${user_id}&comment_id=${comment_id}`,
      { comment: { body: "greatMovie" } }
    );
    return "comment edited";
  } catch (e) {
    throw e;
  }
};

export const getUsers = async () => {
  try {
    let users = await apiClient.get(`/users`);
    return users;
  } catch (e) {
    throw e;
  }
};

export const getUser = async user_id => {
  try {
    let user = await apiClient.get(`/users/${user_id}`).then(res => {
      return res.data;
    });
    return user;
  } catch (e) {
    throw e;
  }
};

export const getFriends = async user_id => {
  try {
    let friends = await apiClient.get(`/users/get_friends?user_id=${user_id}`);
    return friends;
  } catch (e) {
    throw e;
  }
};

export const getFriendRequests = async user_id => {
  try {
    let friends = await apiClient.get(
      `/users/get_friend_requests?user_id=${user_id}`
    );
    return friends;
  } catch (e) {
    throw e;
  }
};

export const getFriend = async friend_id => {
  try {
    let friends = await apiClient.get(`/users/${friend_id}`);
    return friends;
  } catch (e) {
    throw e;
  }
};

export const sendFriendRequest = async friend_id => {
  try {
    let user_id = localStorage.getItem("userId");
    let friendReq = await apiClient.post(`/friends/`, {
      friend: { user1id: friend_id, user2id: user_id, confirmed: false }
    });
    return friendReq;
  } catch (e) {
    throw e;
  }
};

export const acceptFriendRequest = async friend_id => {
  try {
    let user_id = localStorage.getItem("userId");
    let friendReq = await apiClient.put(
      `/friends/editspecificfriend?user1id=${user_id}&user2id=${friend_id}`,
      {
        friend: { user1id: user_id, user2id: friend_id, confirmed: true }
      }
    );
    console.log("friend request accpeted!");
    return friendReq;
  } catch (e) {
    throw e;
  }
};
