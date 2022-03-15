import { csrfFetch } from "./csrf";

const LOAD = "posts/LOAD";
const DELETE = "posts/DELETE";

const load = (posts) => {
  return {
    type: LOAD,
    posts,
  };
};

const del = (id) => {
  return {
    type: DELETE,
    id,
  };
};

export const loadPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");

  if (response.ok) {
    const posts = await response.json();
    dispatch(load(posts));
  }
};

export const deletePost = (id) => async dispatch => {
  const response = await csrfFetch(`/api/posts/${id}`, {method: "DELETE"})
  if (response.ok) {
    const deletedId = await response.json()
    dispatch(del(deletedId))
  }
}

const initialState = { feed: [] };
let newState;
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      newState.feed = action.posts;
      console.log(newState.feed);
      return newState;
    case DELETE:
      newState = {...state};
      newState.feed = newState.feed.filter((post) => post.id !== action.id)
      return newState
    default:
      return state;
  }
};
