import { csrfFetch } from "./csrf";

const LOAD = "posts/LOAD";
const DELETE = "posts/DELETE";
const LOAD_ONE = "posts/LOAD_ONE";
const UPDATE_ONE = "posts/UPDATE_ONE";
const CREATE = "posts/CREATE";
const LIKE = "wineries/LIKE";

const load = (posts) => {
  return {
    type: LOAD,
    posts,
  };
};

const load_one = (post) => {
  return {
    type: LOAD_ONE,
    post,
  };
};

const del = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const update = (post) => {
  return {
    type: UPDATE_ONE,
    post,
  };
};

const create = (post) => {
  return {
    type: CREATE,
    post,
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

export const deletePost = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/${id}`, { method: "DELETE" });
  if (response.ok) {
    const deletedId = await response.json();
    dispatch(del(deletedId));
  }
};

export const updatePost =
  ({ location, caption, id }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, caption, id }),
    });
    if (response.ok) {
      const updatedPost = await response.json();
      dispatch(update(updatedPost));
    }
  };

export const createPost =
  ({ id, caption, image, location }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, caption, image, location }),
    });

    if (response.ok) {
      const newPost = await response.json();
      dispatch(create(newPost));
    }
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
    }
  };

const initialState = { feed: [], current: null };
let newState;
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      newState.feed = action.posts;
      return newState;
    case LOAD_ONE:
      newState = { ...state };
      newState.current = action.post;
      return newState;
    case DELETE:
      newState = { ...state };
      newState.feed = newState.feed.filter((post) => post.id !== action.id);
      return newState;
    case UPDATE_ONE:
      newState = { ...state };
      newState.current = action.post;
      newState.feed.map((post) => {
        if (post.id === action.post.id) return (post = action.post);
      });
      return newState;
    case CREATE:
      newState = { ...state };
      newState.feed.unshift(action.post);
      return newState;
    case LIKE:
      newState = { ...state };
      if (action.like !== "destroyed") {
        newState.feed.map((post) => {
          if (post.id === action.postId) post.Likes.push(action.like)
        })
        if (newState.current && newState.current.id === action.postId) newState.current.Likes.push(action.like)
      } else {
        newState.feed.filter((post) => {
         if(post.id === action.postId) {return post.Likes.filter((like) => like.userId !== action.userId)}
        })
        if (newState.current && newState.current.id === action.postId) newState.current.Likes.filter((like)=> like.userId !== action.userId)
      }
      return newState;
    default:
      return state;
  }
};
