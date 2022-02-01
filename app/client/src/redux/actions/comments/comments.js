import * as actionsTypes from "../actionsTypes"
import axios from "../../../axios"

export const getCommentsStart = () => {
    return {
        type: actionsTypes.GET_BOOK_COMMENTS_START
    };
};
export const getCommentsSuccess = (comments, canComment) => {
    return {
        type: actionsTypes.GET_BOOK_COMMENTS_SUCCESS,
        comments,
        canComment
    };
};
export const getCommentsFail = () => {
    return {
        type: actionsTypes.GET_BOOK_COMMENTS_FAIL
    };
};

export const getComments = (bookId) => {
    return async (dispatch) => {
        // send request
        dispatch(getCommentsStart());

        axios({
            method: "GET",
            url: `/comments`,
            params: {bookId}
        })
            .then((data) => {
                console.log(data)
                dispatch(getCommentsSuccess(data.data.comments, data.data.canComment));
            })
            .catch((e) => {
                console.error(e);
                dispatch(getCommentsFail());
            });
    };
};

export const createCommentStart = () => {
    return {
        type: actionsTypes.CREATE_BOOK_COMMENT_START
    };
};
export const createCommentSuccess = () => {
    return {
        type: actionsTypes.CREATE_BOOK_COMMENT_SUCCESS,
    };
};
export const createCommentFail = () => {
    return {
        type: actionsTypes.CREATE_BOOK_COMMENT_FAIL
    };
};

export const createComment = (bookId, text) => {
    return async (dispatch) => {
        // send request
        dispatch(createCommentStart());
        
        axios({
            method: "POST",
            url: "/comments",
            params: {bookId, text}
        })
            .then((data) => {
                console.log(data)
                dispatch(createCommentSuccess());
                dispatch(getComments(bookId))
            })
            .catch((e) => {
                console.error(e)
                dispatch(createCommentFail());
            });
    };
};
