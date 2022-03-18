import { csrfFetch } from "./csrf";
const FOLLOW = "posts/FOLLOW";
const START = "/api/session/START";
const END = "/api/session/END";

export const startSession = (user) => {
  return {
    type: START,
    user,
  };
};

export const endSession = () => {
  return {
    type: END,
  };
};

const followUnfollow = (follow, followingUserId) => {
  return {
    type: FOLLOW,
    follow,
    followingUserId,
  };
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
      dispatch(followUnfollow(follow, followingUserId));
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
  dispatch(startSession(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(startSession(data.user));
  return response;
};

export const signup =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const data = await response.json();
    dispatch(startSession(data));
    return data;
  };

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", { method: "delete" });
  const data = await response.json();
  dispatch(endSession());
  return data;
};

const initialState = {};

export default function sessionReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case START:
      newState = { ...state }; //Object.assign({}, state)
      newState.user = action.user;
      return newState;
    case END:
      newState = { ...state };
      delete newState.user;
      return newState;
    case FOLLOW:
      newState = { ...state };
      if (action.follow !== "destroyed") {
        newState.user.Followings.push(action.follow);
      } else {
        newState.user.Followings = newState.user.Followings.filter(
          (f) => f.followedUserId !== action.followedUserId
        );
      }
      console.log(newState.user.Followings);
      return newState;
    default:
      return state;
  }
}
