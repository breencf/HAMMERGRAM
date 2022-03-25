import { csrfFetch } from "./csrf";
const FOLLOW = "posts/FOLLOW";
const LIKE = "posts/LIKE";
const START = "/api/session/START";
const END = "/api/session/END";

export const startSession = (user, following, likes) => {
  return {
    type: START,
    user,
    following,
    likes,
  };
};

export const endSession = () => {
  return {
    type: END,
  };
};

const followUnfollow = ({ follow, followedUserId, followingUserId }) => {
  return {
    type: FOLLOW,
    follow,
    followedUserId,
    followingUserId,
  };
};

const likeUnlike = ({ userId, postId, like }) => {
  return {
    type: LIKE,
    userId,
    postId,
    like,
  };
};

export const likeButton =
  ({ userId, postId }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, postId }),
    });

    if (response.ok) {
      const like = await response.json();
      dispatch(likeUnlike({ userId, postId, like }));
      return true;
    }
  };

export const followButton =
  ({ followingUserId, followedUserId }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/users/${followedUserId}/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followingUserId, followedUserId }),
    });

    if (response.ok) {
      const follow = await response.json();
      dispatch(followUnfollow({ follow, followedUserId, followingUserId }));
      return true;
    }
  };

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;

  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(startSession(data.user, data.following, data.likes));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(startSession(data.user, data.following, data.likes));
  return response;
};

export const signup =
  ({ name, username, email, password }) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, username, email, password }),
    });
    const data = await response.json();
    console.log(data);
    dispatch(startSession(data.user, data.following, data.likes));
    return data;
  };

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", { method: "delete" });
  const data = await response.json();
  dispatch(endSession());
  return data;
};

const initialState = { user: {}, likes: {}, following: {} };

export default function sessionReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case START:
      newState = { ...state }; //Object.assign({}, state)
      newState.user = action.user;
      if (action.following && action.likes) {
        action.following.forEach((obj) => {
          newState.following[obj.followedUserId] = obj;
        });
        action.likes.forEach((obj) => (newState.likes[obj.postId] = obj));
      }
      return newState;
    case END:
      newState = { ...state };
      delete newState.user;
      delete newState.likes;
      delete newState.following;
      return newState;
    case FOLLOW:
      newState = { ...state };
      if (action.follow === "destroyed") {
        delete newState.following[action.followedUserId];
      } else {
        newState.following[action.followedUserId] = action.follow;
      }
      return newState;
    case LIKE:
      newState = { ...state };
      if (action.like === "destroyed") {
        delete newState.likes[action.postId];
      } else {
        newState.likes[action.postId] = action.like;
      }
      return newState;
    default:
      return state;
  }
}
