import { csrfFetch } from "./csrf";

const LOAD = "posts/LOAD";
const DELETE = "posts/DELETE";
const LOAD_ONE = "posts/LOAD_ONE";
const UPDATE_ONE = "posts/UPDATE_ONE";
const CREATE = "posts/CREATE";
const LIKE = "posts/LIKE";
const CREATE_COMMENT = "comments/CREATE";
const DELETE_COMMENT = "comments/DELETE";

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

const createComment = (newComment) => {
  return {
    type: CREATE_COMMENT,
    newComment,
  };
};

const deleteComment = (deletedComment) => {
  return {
    type: DELETE_COMMENT,
    deletedComment,
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
      return true;
    }
  };

export const createAComment = ({userId, postId, content}) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/posts/${postId}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({userId, postId, content}),
    }
  );
  const newComment = await response.json();
  dispatch(createComment(newComment));
  return true
};

export const deleteAComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/comments/${id}`, { method: "DELETE" });
  if (response.ok) {
    const deletedComment = await response.json();
    dispatch(deleteComment(deletedComment));
    return true
  }
};

const initialState = { feed: {}, current: null };
let newState;
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      let flattened = {};
      action.posts.map((post) => (flattened[post.id] = post));
      newState.feed = flattened;
      return newState;
    case LOAD_ONE:
      newState = { ...state };
      newState.current = action.post;
      return newState;
    case DELETE:
      newState = { ...state };
      delete newState.feed[action.id];
      return newState;
    case UPDATE_ONE:
      newState = { ...state };
      newState.current = action.post;
      newState.feed[action.post.id] = action.post;
      return newState;
    case CREATE:
      newState = { ...state };
      newState.feed[action.post.id] = action.post;
      return newState;
    case LIKE:
      newState = { ...state };
      if (action.like !== "destroyed") {
        newState.feed[action.postId].Likes.push(action.like);
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
    case CREATE_COMMENT:
      newState = { ...state };
      newState.current.Comments.push(action.newComment);
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      newState.current.Comments = newState.current.Comments.filter(comment => comment.id !== action.deletedComment.postId)
      return newState;
    default:
      return state;
  }
};
