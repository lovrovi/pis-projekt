import * as actionsTypes from "../actionsTypes"
import axios from "../../../axios"
import { useAppendUrl } from "../../../customHooks/useAppendUrl";

export const getCommentsStart = () => {
    return {
        type: actionsTypes.GET_BOOK_COMMENTS_START
    };
};
export const getCommentsSuccess = (comments) => {
    return {
        type: actionsTypes.GET_BOOK_COMMENTS_SUCCESS,
        comments
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
                dispatch(getCommentsSuccess(data.data.comments));
            })
            .catch((e) => {
                console.error(e);
                dispatch(getCommentsFail());
            });
    };
};
