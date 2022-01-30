import * as actionsTypes from "../actionsTypes"
import axios from "../../../axios"
import * as FormData from 'form-data'
import { useAppendUrl } from "../../../customHooks/useAppendUrl";
import { generateImageName } from "../../../customHooks/generateImageName";

export const getBooksStart = () => {
    return {
        type: actionsTypes.GET_BOOKS_START
    };
};
export const getBooksSuccess = (books) => {
    return {
        type: actionsTypes.GET_BOOKS_SUCCESS,
        books
    };
};
export const getBooksFail = () => {
    return {
        type: actionsTypes.GET_BOOKS_FAIL
    };
};

export const getBooks = (search = "") => {
    return async (dispatch) => {
        // send request
        dispatch(getBooksStart());
        search = encodeURIComponent(search);

        axios({
            method: "GET",
            url: "/books",
            params: {
                search
            }
        })
            .then((data) => {
                console.log("getBooks:", data);
                const books = data.data.map(book => {
                    let price = book.price + '$'
                    return {...book, price}
                })
                dispatch(getBooksSuccess(books));

            })
            .catch((e) => {
                console.error(e);
                dispatch(getBooksFail());
            });
    };
};

export const getBookDetailsStart = () => {
    return {
        type: actionsTypes.GET_BOOK_DETAILS_START
    };
};
export const getBookDetailsSuccess = (book) => {
    return {
        type: actionsTypes.GET_BOOK_DETAILS_SUCCESS,
        book
    };
};
export const getBookDetailsFail = () => {
    return {
        type: actionsTypes.GET_BOOK_DETAILS_FAIL
    };
};

export const getBookDetails = (id) => {
    return async (dispatch) => {
        // send request
        dispatch(getBookDetailsStart());

        axios({
            method: "GET",
            url: `/books/${id}`
        })
            .then((data) => {
                const book = {
                    ...data.data,
                    image: useAppendUrl(data.data.image),
                }
                dispatch(getBookDetailsSuccess(book));
            })
            .catch((e) => {
                console.error(e);
                dispatch(getBookDetailsFail());
            });
    };
};

export const putBookStart = () => {
    return {
        type: actionsTypes.PUT_BOOK_START
    };
};
export const putBookSuccess = () => {
    return {
        type: actionsTypes.PUT_BOOK_SUCCESS
    };
};
export const putBookFail = () => {
    return {
        type: actionsTypes.PUT_BOOK_FAIL
    };
};

export const putBook = (book) => {
    return async (dispatch) => {
        // send request
        dispatch(putBookStart());
        delete book.publisher;
        const imageName = generateImageName(book.image?.name)
        let formData = new FormData()
        formData.append("title", book.title)
        formData.append("description", book.description)
        formData.append("pages", book.pages)
        formData.append("price", book.price)
        formData.append("image", book.image, imageName)
        formData.append("publisherId", book.publisherId)

        axios({
            method: "PUT",
            url: `/books/${book.id}`,
            data: formData
        })
            .then((data) => {
                dispatch(putBookSuccess());
                dispatch(getBookDetails(book.id))
            })
            .catch((e) => {
                console.error(e);
                dispatch(putBookFail());
            });
    };
};

export const deleteBookStart = () => {
    return {
        type: actionsTypes.DELETE_BOOK_START
    };
};
export const deleteBookSuccess = (bookId) => {
    return {
        type: actionsTypes.DELETE_BOOK_SUCCESS,
        bookId
    };
};
export const deleteBookFail = () => {
    return {
        type: actionsTypes.DELETE_BOOK_FAIL
    };
};
export const deleteBook = (id) => {
    return async (dispatch) => {
        // send request
        dispatch(deleteBookStart());

        axios({
            method: "DELETE",
            url: `/books/${id}`,
        })
            .then((data) => {
                console.log("deleteBooks:", data);
                dispatch(deleteBookSuccess(id));
                dispatch(getBooks());

            })
            .catch((e) => {
                console.error(e);
                dispatch(deleteBookFail());
            });
    };
};

export const createBookStart = () => {
    return {
        type: actionsTypes.CREATE_BOOK_START
    };
};
export const createBookSuccess = () => {
    return {
        type: actionsTypes.CREATE_BOOK_SUCCESS,
    };
};
export const createBookFail = () => {
    return {
        type: actionsTypes.CREATE_BOOK_FAIL
    };
};

export const createBook = (book, checkedAuthors) => {
    return async (dispatch) => {
        // send request
        dispatch(createBookStart());
        book.authors = checkedAuthors
        const imageName = generateImageName(book.image.name)
        let formData = new FormData()
        formData.append("title", book.title)
        formData.append("description", book.description)
        formData.append("pages", book.pages)
        formData.append("price", book.price)
        formData.append("image", book.image, imageName)
        formData.append("publisherId", book.publisherId)
        for (var i = 0; i < checkedAuthors.length; i++) {
            formData.append('authors', checkedAuthors[i]);
        }
        axios({
            method: "POST",
            url: "/books",
            data: formData
        })
            .then((data) => {
                dispatch(createBookSuccess());
                dispatch(getBooks())
            })
            .catch((e) => {
                dispatch(createBookFail());
            });
    };
};

export const createBookReservationStart = () => {
    return {
        type: actionsTypes.CREATE_BOOK_RESERVATION_START
    };
};
export const createBookReservationSuccess = () => {
    return {
        type: actionsTypes.CREATE_BOOK_RESERVATION_SUCCESS,
    };
};
export const createBookReservationFail = () => {
    return {
        type: actionsTypes.CREATE_BOOK_RESERVATION_FAIL
    };
};

export const createBookReservation = (bookId, timeStamp) => {
    return async (dispatch) => {
        // send request
        dispatch(createBookReservationStart());
        axios({
            method: "POST",
            url: "/reservations",
            params: {bookId, timeStamp}
        })
            .then((data) => {
                console.log(data)
                dispatch(createBookReservationSuccess());
            })
            .catch((e) => {
                console.error(e)
                dispatch(createBookReservationFail());
            });
    };
};

export const getReservationsStart = () => {
    return {
        type: actionsTypes.GET_RESERVATIONS_START
    };
};
export const getReservationsSuccess = (reservations) => {
    return {
        type: actionsTypes.GET_RESERVATIONS_SUCCESS,
        reservations
    };
};
export const getReservationsFail = () => {
    return {
        type: actionsTypes.GET_RESERVATIONS_FAIL
    };
};

export const getReservations = () => {
    return async (dispatch) => {
        // send request
        dispatch(getReservationsStart());

        axios({
            method: "GET",
            url: "/reservations",
        })
            .then((data) => {
                console.log("getReservations:", data);
                dispatch(getReservationsSuccess(data.data));

            })
            .catch((e) => {
                console.error(e);
                dispatch(getReservationsFail());
            });
    };
};


