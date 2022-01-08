import * as actionsTypes from "../actionsTypes"
import axios from "../../../axios"
import * as FormData from 'form-data'
import { generateImageName } from "../../../customHooks/generateImageName";
import { useAppendUrl } from "../../../customHooks/useAppendUrl";

export const getAuthorsStart = () => {
    return {
        type: actionsTypes.GET_AUTHORS_START
    };
};
export const getAuthorsSuccess = (authors) => {
    return {
        type: actionsTypes.GET_AUTHORS_SUCCESS,
        authors
    };
};
export const getAuthorsFail = () => {
    return {
        type: actionsTypes.GET_AUTHORS_FAIL
    };
};

export const getAuthors = (search = "") => {
    return async (dispatch) => {
        // send request
        dispatch(getAuthorsStart());
        search = encodeURIComponent(search);

        axios({
            method: "GET",
            url: "/authors",
            params: {
                search
            }
        })
            .then((data) => {
                console.log("getAuthors:", data);
                const authors = data.data.map(author => {
                    let birthdayDate = author.birthdayDate.split("T")[0]
                    return {...author, birthdayDate}
                })
                dispatch(getAuthorsSuccess(authors));
            })
            .catch((e) => {
                console.error(e);
                dispatch(getAuthorsFail());
            });
    };
};

export const getAuthorDetailsStart = () => {
    return {
        type: actionsTypes.GET_AUTHOR_DETAILS_START
    };
};
export const getAuthorDetailsSuccess = (author) => {
    return {
        type: actionsTypes.GET_AUTHOR_DETAILS_SUCCESS,
        author
    };
};
export const getAuthorDetailsFail = () => {
    return {
        type: actionsTypes.GET_AUTHOR_DETAILS_FAIL
    };
};

export const getAuthorDetails = (id) => {
    return async (dispatch) => {
        // send request
        dispatch(getAuthorDetailsStart());

        axios({
            method: "GET",
            url: `/authors/${id}`
        })
            .then((data) => {
                const birthday = data.data.birthdayDate.split("T")[0]
                const author = {
                    ...data.data,
                    image: useAppendUrl(data.data.image),
                    birthdayDate: birthday
                }
                dispatch(getAuthorDetailsSuccess(author));
            })
            .catch((e) => {
                console.error(e);
                dispatch(getAuthorDetailsFail());
            });
    };
};

export const putAuthorStart = () => {
    return {
        type: actionsTypes.PUT_AUTHOR_START
    };
};
export const putAuthorSuccess = () => {
    return {
        type: actionsTypes.PUT_AUTHOR_SUCCESS,
    };
};
export const putAuthorFail = () => {
    return {
        type: actionsTypes.PUT_AUTHOR_FAIL
    };
};

export const updateAuthor = (author) => {
    return async (dispatch) => {
        // send request
        dispatch(putAuthorStart());
        const imageName = generateImageName(author.image?.name)
        let formData = new FormData()
        formData.append("name", author.name)
        formData.append("email", author.email)
        formData.append("birthdayDate", author.birthdayDate)
        formData.append("biography", author.biography)
        formData.append("image", author.image, imageName)

        axios({
            method: "PUT",
            url: `/authors/${author.id}`,
            data: formData
        })
            .then((data) => {
                dispatch(putAuthorSuccess());
                dispatch(getAuthorDetails(author.id))
            })
            .catch((e) => {
                console.error(e);
                dispatch(putAuthorFail());
            });
    };
};

export const deleteAuthorStart = () => {
    return {
        type: actionsTypes.DELETE_AUTHOR_START
    };
};
export const deleteAuthorSuccess = (authorId) => {
    return {
        type: actionsTypes.DELETE_AUTHOR_SUCCESS,
        authorId
    };
};
export const deleteAuthorFail = () => {
    return {
        type: actionsTypes.DELETE_AUTHOR_FAIL
    };
};
export const deleteAuthor = (id) => {
    return async (dispatch) => {
        // send request
        dispatch(deleteAuthorStart());

        axios({
            method: "DELETE",
            url: `/authors/${id}`,
        })
            .then((data) => {
                console.log("deleteAuthors:", data);
                dispatch(deleteAuthorSuccess(id));
                dispatch(getAuthors());
            })
            .catch((e) => {
                console.error(e);
                dispatch(deleteAuthorFail());
            });
    };
};

export const createAuthorStart = () => {
    return {
        type: actionsTypes.CREATE_AUTHOR_START
    };
};
export const createAuthorSuccess = () => {
    return {
        type: actionsTypes.CREATE_AUTHOR_SUCCESS,
    };
};
export const createAuthorFail = () => {
    return {
        type: actionsTypes.CREATE_AUTHOR_FAIL
    };
};

export const createAuthor = (author) => {
    return async (dispatch) => {
        // send request
        dispatch(createAuthorStart());
        const imageName = generateImageName(author.image.name)
        let formData = new FormData()
        formData.append("name", author.name)
        formData.append("email", author.email)
        formData.append("birthdayDate", author.birthdayDate)
        formData.append("biography", author.biography)
        formData.append("image", author.image, imageName);
        axios({
            method: "POST",
            url: `/authors`,
            data: formData
        })
            .then((data) => {
                dispatch(createAuthorSuccess());
                dispatch(getAuthors());
            })
            .catch((e) => {
                console.error(e);
                dispatch(createAuthorFail());
            });
    };
};