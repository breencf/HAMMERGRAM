import { csrfFetch } from "./csrf";
const LOAD_PROFILE = "users/LOAD_PROFILE";
const LOAD_ACTIVITY = "users/LOAD_ACTIVITY";
const LOAD_FOLLOWERS = "users/LOAD_FOLLOWERS";


const load = (profile) => {
  return { type: LOAD_PROFILE, profile };
};


const lFollowers = (followers) => {
  return {
    type: LOAD_FOLLOWERS,
    followers,
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
  console.log("thunk");
  if (response.ok) {
    const activity = await response.json();
    console.log(activity);
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
    case LOAD_ACTIVITY:
      newState = { ...state };
      newState.activity = action.activity;
      return newState
    case LOAD_FOLLOWERS:
      newState = {...state}
      newState.profile.Followers = action.followers
      console.log(newState.profile.Followers)
      return newState
    default:
      return state;
  }
};
