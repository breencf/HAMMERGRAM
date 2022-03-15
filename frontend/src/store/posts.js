import { csrfFetch } from "./csrf";

const LOAD = "posts/LOAD";
const DELETE = "posts/DELETE";
const LOAD_ONE="posts/LOAD_ONE"

const load = (posts) => {
  return {
    type: LOAD,
    posts,
  };
};

const load_one = post => {
  return {
    type: LOAD_ONE,
    post
  }
}

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

export const loadOnePost = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);

  if (response.ok) {
    const post = await response.json();
    dispatch(load_one(post));
  }
};

export const deletePost = (id) => async dispatch => {
  const response = await csrfFetch(`/api/posts/${id}`, {method: "DELETE"})
  if (response.ok) {
    const deletedId = await response.json()
    dispatch(del(deletedId))
  }
}

const initialState = { feed: [], current: null };
let newState;
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      newState.feed = action.posts;
      return newState;
    case LOAD_ONE:
      newState = {...state};
      newState.current = action.post
      return newState;
    case DELETE:
      newState = {...state};
      newState.feed = newState.feed.filter((post) => post.id !== action.id)
      return newState
    default:
      return state;
  }
};
