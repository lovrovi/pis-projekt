import * as actionsTypes from "../../actions/actionsTypes";

const initialState = {
  books: [],
  getBooksLoading: false,
  book: {},
  bookDetailsLoading: false,
  putBookLoading: false,
  reservations: [],
  getReservationsLoading: false
};

// books
const getBooksStart = (state, action) => ({
  ...state,
  getBooksLoading: true
});

const getBooksSuccess = (state, action) => ({
  ...state,
  books: [...action.books],
  getBooksLoading: false
});

const getBooksFail = (state, action) => ({
  ...state,
  getBooksLoading: false
});

const getBookDetailsStart = (state, action) => ({
  ...state,
  bookDetailsLoading: true
});

const getBookDetailsSuccess = (state, action) => ({
  ...state,
  book: action.book,
  bookDetailsLoading: false
});

const getBookDetailsFail = (state, action) => ({
  ...state,
  bookDetailsLoading: false
});

// update book

const putBooksStart = (state, action) => ({
  ...state,
  putBookLoading: true
});

const putBooksSuccess = (state, action) => ({
  ...state,
  putBookLoading: false
});

const putBooksFail = (state, action) => ({
  ...state,
  putBookLoading: false
});

//delete book
const deleteBookStart = (state, action) => ({
  ...state,
});

const deleteBookSuccess = (state, action) => ({
  ...state,
  books: [...state.books.filter(book => book.id !== action.bookId)]
});

const deleteBookFail = (state, action) => ({
  ...state,
});

//create author

const createBookStart = (state, action) => ({
  ...state
});

const createBookSuccess = (state, action) => ({
  ...state,
});

const createBookFail = (state, action) => ({
  ...state
});

// reservations
const getReservationsStart = (state, action) => ({
  ...state,
  getReservationsLoading: true
});

const getReservationsSuccess = (state, action) => ({
  ...state,
  reservations: [...action.reservations],
  getReservationsLoading: false
});

const getReservationsFail = (state, action) => ({
  ...state,
  getReservationsLoading: false
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_BOOKS_START:
      return getBooksStart(state, action);
    case actionsTypes.GET_BOOKS_SUCCESS:
      return getBooksSuccess(state, action);
    case actionsTypes.GET_BOOKS_FAIL:
      return getBooksFail(state, action);
    case actionsTypes.GET_BOOK_DETAILS_START:
      return getBookDetailsStart(state, action);
    case actionsTypes.GET_BOOK_DETAILS_SUCCESS:
      return getBookDetailsSuccess(state, action);
    case actionsTypes.GET_BOOK_DETAILS_FAIL:
      return getBookDetailsFail(state, action);
    case actionsTypes.PUT_BOOK_START:
      return putBooksStart(state, action);
    case actionsTypes.PUT_BOOK_SUCCESS:
      return putBooksSuccess(state, action);
    case actionsTypes.PUT_BOOK_FAIL:
      return putBooksFail(state, action);
    case actionsTypes.DELETE_BOOK_START:
      return deleteBookStart(state, action);
    case actionsTypes.DELETE_BOOK_SUCCESS:
      return deleteBookSuccess(state, action);
    case actionsTypes.DELETE_BOOK_FAIL:
      return deleteBookFail(state, action);
    case actionsTypes.CREATE_BOOK_START:
      return createBookStart(state, action);
    case actionsTypes.CREATE_BOOK_SUCCESS:
      return createBookSuccess(state, action);
    case actionsTypes.CREATE_BOOK_FAIL:
      return createBookFail(state, action);
    case actionsTypes.GET_RESERVATIONS_START:
      return getReservationsStart(state, action);
    case actionsTypes.GET_RESERVATIONS_SUCCESS:
      return getReservationsSuccess(state, action);
    case actionsTypes.GET_RESERVATIONS_FAIL:
      return getReservationsFail(state, action);
    default:
      return state;
  }
};

export default reducer;