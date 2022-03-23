import { csrfFetch } from "./csrf";

const LOAD = "posts/LOAD";
const LOADRANDOM = "posts/LOADRANDOM";
const DELETE = "posts/DELETE";
const LOAD_ONE = "posts/LOAD_ONE";
const UPDATE_ONE = "posts/UPDATE_ONE";
const CREATE = "posts/CREATE";
const CREATE_COMMENT = "comments/CREATE";
const DELETE_COMMENT = "comments/DELETE";

const load = (posts) => {
  return {
    type: LOAD,
    posts,
  };
};

const loadRandom = (posts) => {
  return {
    type: LOADRANDOM,
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

export const loadPosts = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/feed/${id}`);

  if (response.ok) {
    const posts = await response.json();
    dispatch(load(posts));
  }
};

export const loadRandomPosts = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/random/${id}`);

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadRandom(posts));
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
    const formData = new FormData();
    formData.append("id", id);
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("image", image);

    //for multiple
    // if (images && images.length !== 0) {
    //   for (var i = 0; i < images.length; i++) {
    //     formData.append("images", images[i]);
    //   }
    // }

    const response = await csrfFetch(`/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    if (response.ok) {
      const newPost = await response.json();
      dispatch(create(newPost));
    }
  };

export const createAComment =
  ({ userId, postId, content }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, postId, content }),
    });
    const newComment = await response.json();
    dispatch(createComment(newComment));
    return newComment;
  };

export const deleteAComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/posts/comments/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deletedComment = await response.json();
    dispatch(deleteComment(deletedComment));
    return deletedComment;
  }
};

const initialState = { feed: {}, current: null, explore:{} };
let newState;
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      newState = { ...state };
      let flattened = {};
      action.posts.map((post) => (flattened[post.id] = post));
      newState.feed = flattened;
      return newState;
    case LOADRANDOM:
      newState = { ...state };
      let randomflattened = {};
      action.posts.map((post) => (randomflattened[post.id] = post));
      newState.explore = randomflattened;
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
    case CREATE_COMMENT:
      newState = { ...state };
      newState.current.Comments.push(action.newComment);
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      newState.current.Comments = newState.current.Comments.filter(
        (comment) => comment.id !== action.deletedComment.postId
      );
      return newState;
    default:
      return state;
  }
};
