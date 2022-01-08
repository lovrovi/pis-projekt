import * as actionsTypes from "../../actions/actionsTypes";

const initialState = {
  authors: [],
  getAuthorsLoading: false,
  author: {},
  authorDetailsLoading: false,
  updateAuthorsLoading: false,
  createAuthorLoading: false
};

// get authors
const getAuthorsStart = (state, action) => ({
  ...state,
  getAuthorsLoading: true
});

const getAuthorsSuccess = (state, action) => ({
  ...state,
  authors: [...action.authors],
  getAuthorsLoading: false
});

const getAuthorsFail = (state, action) => ({
  ...state,
  getAuthorsLoading: false
});

// get author details
const getAuthorDetailsStart = (state, action) => ({
  ...state,
  authorDetailsLoading: true
});

const getAuthorDetailsSuccess = (state, action) => ({
  ...state,
  author: { ...action.author },
  authorDetailsLoading: false
});

const getAuthorDetailsFail = (state, action) => ({
  ...state,
  authorDetailsLoading: false
});

// update author
const putAuthorStart = (state, action) => ({
  ...state,
  updateAuthorsLoading: true
});

const putAuthorSuccess = (state, action) => ({
  ...state,
  updateAuthorsLoading: false
});

const putAuthorFail = (state, action) => ({
  ...state,
  updateAuthorsLoading: false
});

const deleteAuthorStart = (state, action) => ({
  ...state,
});

const deleteAuthorSuccess = (state, action) => ({
  ...state,
  authors: [...state.authors.filter(author => author.id !== action.authorId)]
});

const deleteAuthorFail = (state, action) => ({
  ...state,
});

const createAuthorStart = (state, action) => ({
  ...state,
  createAuthorLoading: true
});

const createAuthorSuccess = (state, action) => ({
  ...state,
  createAuthorLoading: false
});

const createAuthorFail = (state, action) => ({
  ...state,
  createAuthorLoading: false
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_AUTHORS_START:
      return getAuthorsStart(state, action);
    case actionsTypes.GET_AUTHORS_SUCCESS:
      return getAuthorsSuccess(state, action);
    case actionsTypes.GET_AUTHORS_FAIL:
      return getAuthorsFail(state, action);
    case actionsTypes.GET_AUTHOR_DETAILS_START:
      return getAuthorDetailsStart(state, action);
    case actionsTypes.GET_AUTHOR_DETAILS_SUCCESS:
      return getAuthorDetailsSuccess(state, action);
    case actionsTypes.GET_AUTHOR_DETAILS_FAIL:
      return getAuthorDetailsFail(state, action);
    case actionsTypes.PUT_AUTHOR_START:
      return putAuthorStart(state, action);
    case actionsTypes.PUT_AUTHOR_SUCCESS:
      return putAuthorSuccess(state, action);
    case actionsTypes.PUT_AUTHOR_FAIL:
      return putAuthorFail(state, action);
    case actionsTypes.DELETE_AUTHOR_START:
      return deleteAuthorStart(state, action);
    case actionsTypes.DELETE_AUTHOR_SUCCESS:
      return deleteAuthorSuccess(state, action);
    case actionsTypes.DELETE_AUTHOR_FAIL:
      return deleteAuthorFail(state, action);
    case actionsTypes.CREATE_AUTHOR_START:
      return createAuthorStart(state, action);
    case actionsTypes.CREATE_AUTHOR_SUCCESS:
      return createAuthorSuccess(state, action);
    case actionsTypes.CREATE_AUTHOR_FAIL:
      return createAuthorFail(state, action);
    default:
      return state;
  }
};

export default reducer;