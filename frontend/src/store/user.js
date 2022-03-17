import { csrfFetch } from "./csrf";

const LOAD_PROFILE = "users/LOAD";
const FOLLOW = "posts/FOLLOW";

const load = (profile) => {
  return { type: LOAD_PROFILE, profile };
};

export const loadProfile = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`);

  if (response.ok) {
    const profile = await response.json();
    dispatch(load(profile));
  }
};

const followUnfollow = (follow, followingUserId) => {
  return {
    type: FOLLOW,
    follow,
    followingUserId
  };
};

export const followButton =
  ({ followingUserId, followerUserId }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/users/${followerUserId}/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followingUserId, followerUserId }),
    });

    if (response.ok) {
      const follow = await response.json();
      dispatch(followUnfollow(follow, followingUserId));
      return true;
    }
  };

const initialState = {};
let newState;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      newState = { ...state };
      newState = action.profile;
      return newState;
    case FOLLOW:
      newState = { ...state };
      if (action.follow !== "destroyed") {
        newState.Followers.push(action.follow);
      } else {
        console.log(action.follow)
        newState.Followers = newState.Followers.filter(
          (f) => f.followingUserId !== action.followingUserId
        );
      }
      return newState;
    default:
      return state;
  }
};
