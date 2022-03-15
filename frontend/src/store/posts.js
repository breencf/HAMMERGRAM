import { csrfFetch } from "./csrf";

const LOAD = "posts/LOAD";

const load = (posts) => {
  return {
    type: LOAD,
    posts,
  };
};

export const loadPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");

  if (response.ok) {
    const posts = await response.json();
    dispatch(load(posts));
  }
};

const initialState = {feed: []}
let newState
export const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            newState = {...state}
            newState.feed = action.posts
            console.log(newState.feed)
            return newState
        default:
            return state;
    }
}
