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

const followUnfollow = (follow) => {
  return {
    type: FOLLOW,
    follow,
  };
};

export const followButton =
  ({ followingUserId, followerUserId }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/users/${followerUserId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followingUserId, followerUserId }),
    });

    if (response.ok) {
      const follow = await response.json();
      dispatch(followUnfollow(follow));
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
      if (action.like !== "destroyed") {
        newState.Follows.push(action.like);
        if (newState.current && newState.current.id === action.postId)
          newState.current.Likes.push(action.like);
      } else {
        newState.feed[action.postId].Likes = newState.feed[
          action.postId
        ].Likes.filter((like) => like.userId !== action.userId);
        if (newState.current && newState.current.id === action.postId)
          newState.current.likes = newState.current.Likes.filter(
            (like) => like.userId !== action.userId
          );
      }
      return newState;
    default:
      return state;
  }
};
