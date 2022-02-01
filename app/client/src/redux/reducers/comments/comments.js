import * as actionsTypes from "../../actions/actionsTypes";

const initialState = {
  comments: [],
  getCommentsLoading: false,
  canComment: false,
};

// comments
const getCommentsStart = (state, action) => ({
  ...state,
  getCommentsLoading: true
});

const getCommentsSuccess = (state, action) => ({
  ...state,
  comments: [...action.comments],
  getCommentsLoading: false,
  canComment: action.canComment
});

const getCommentsFail = (state, action) => ({
  ...state,
  getCommentsLoading: false
});



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_BOOK_COMMENTS_START:
      return getCommentsStart(state, action);
    case actionsTypes.GET_BOOK_COMMENTS_SUCCESS:
      return getCommentsSuccess(state, action);
    case actionsTypes.GET_BOOK_COMMENTS_FAIL:
      return getCommentsFail(state, action);
    default:
      return state;
  }
};

export default reducer;