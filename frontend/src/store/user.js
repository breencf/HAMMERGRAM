import { csrfFetch } from "./csrf";

const LOAD_PROFILE = "users/LOAD_PROFILE";
const FOLLOW = "posts/FOLLOW";
const LOAD_ACTIVITY = "users/LOAD_ACTIVITY";
const LOAD_FOLLOWING = "users/LOAD_FOLLOWING";

const load = (profile) => {
  return { type: LOAD_PROFILE, profile };
};

const followUnfollow = (follow, followingUserId) => {
  return {
    type: FOLLOW,
    follow,
    followingUserId,
  };
};

const lActivity = (activity) => {
  return {
    type: LOAD_ACTIVITY,
    activity,
  };
};

export const loadActivity = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/activity`);
  console.log("thunk");
  if (response.ok) {
    const activity = await response.json();
    console.log(activity);
    dispatch(lActivity(activity));
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
      dispatch(followUnfollow(follow, followingUserId));
      return true;
    }
  };

export const loadProfile = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`);

  if (response.ok) {
    const profile = await response.json();
    dispatch(load(profile));
  }
};

const initialState = { profile: {}, activity: [] };
let newState;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      newState = { ...state };
      newState.profile = action.profile;
      return newState;
    case FOLLOW:
      newState = { ...state };
      if (action.follow !== "destroyed") {
        newState.profile.Followers.push(action.follow);
      } else {
        console.log(action.follow);
        newState.profile.Followers = newState.profile.Followers.filter(
          (f) => f.followingUserId !== action.followingUserId
        );
      }
      return newState;
    case LOAD_ACTIVITY:
      newState = { ...state };
      newState.activity = action.activity;
      return newState
    default:
      return state;
  }
};
