import { csrfFetch } from "./csrf";
const LOAD_PROFILE = "users/LOAD_PROFILE";
const LOAD_ACTIVITY = "users/LOAD_ACTIVITY";
const LOAD_FOLLOWERS = "users/LOAD_FOLLOWERS";
const LOAD_FOLLOWING = "users/LOAD_FOLLOWING";
const CLEAR = "users/clear"


const load = (profile) => {
  return { type: LOAD_PROFILE, profile };
};

export const clearUsers = () => {
  return { type: CLEAR}
}


const lFollowers = (followers) => {
  return {
    type: LOAD_FOLLOWERS,
    followers,
  }
}

const lFollowing = (following) => {
  return {
    type: LOAD_FOLLOWING,
    following,
  }
}


const lActivity = (activity) => {
  return {
    type: LOAD_ACTIVITY,
    activity,
  };
};

export const loadActivity = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/activity`);
  if (response.ok) {
    const activity = await response.json();
    dispatch(lActivity(activity));
  }
};

export const loadFollowers = id => async dispatch => {
  const response = await fetch(`/api/users/${id}/followers`)
  if (response.ok) {
    const followers = await response.json()
    dispatch (lFollowers(followers))
  }
}

export const loadFollowing = id => async dispatch => {
  const response = await fetch(`/api/users/${id}/following`)
  if (response.ok) {
    const followers = await response.json()
    dispatch (lFollowing(followers))
  }
}


export const loadProfile = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`);

  if (response.ok) {
    const profile = await response.json();
    dispatch(load(profile));
  }
};

const initialState = { profile: {}, activity: [], profileFollowers: [], profileFollowing:[] };
let newState;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      newState = { ...state };
      newState.profile = action.profile;
      return newState;
    case LOAD_ACTIVITY:
      newState = { ...state };
      newState.activity = action.activity;
      return newState
    case LOAD_FOLLOWERS:
      newState = {...state}
      newState.profileFollowers = action.followers
      return newState;
      case LOAD_FOLLOWING:
        newState = {...state}
        newState.profileFollowing = action.following
        return newState;
      case CLEAR:
      newState = initialState;
      return newState;
    default:
      return state;
  }
};
