import * as actionsTypes from "../../actions/actionsTypes";

const initialState = {
  loans: [],
  getLoansLoading: false,
  putLoanLoading: false
};

// get publishers

const getLoansStart = (state, action) => ({
  ...state,
  getLoansLoading: true
});

const getLoansSuccess = (state, action) => ({
  ...state,
  loans: [...action.loans],
  getLoansLoading: false
});

const getLoansFail = (state, action) => ({
  ...state,
  getLoansLoading: false
});

// update loan

const putLoansStart = (state, action) => ({
  ...state,
  putLoanLoading: true
});

const putLoansSuccess = (state, action) => ({
  ...state,
  putLoanLoading: false
});

const putLoansFail = (state, action) => ({
  ...state,
  putLoanLoading: false
});

// delete loan

const deleteLoanStart = (state, action) => ({
  ...state
});

const deleteLoanSuccess = (state, action) => ({
  ...state,
  loans: [...state.loans.filter(loan => loan.id !== action.loanId)]
});

const deleteLoanFail = (state, action) => ({
  ...state
});

//create loan

const createLoanStart = (state, action) => ({
  ...state
});

const createLoanSuccess = (state, action) => ({
  ...state,
});

const createLoanFail = (state, action) => ({
  ...state
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_LOANS_START:
      return getLoansStart(state, action);
    case actionsTypes.GET_LOANS_SUCCESS:
      return getLoansSuccess(state, action);
    case actionsTypes.GET_LOANS_FAIL:
      return getLoansFail(state, action);
    case actionsTypes.PUT_LOAN_START:
      return putLoansStart(state, action);
    case actionsTypes.PUT_LOAN_SUCCESS:
      return putLoansSuccess(state, action);
    case actionsTypes.PUT_LOAN_FAIL:
      return putLoansFail(state, action);
    case actionsTypes.DELETE_LOAN_START:
      return deleteLoanStart(state, action);
    case actionsTypes.DELETE_LOAN_SUCCESS:
      return deleteLoanSuccess(state, action);
    case actionsTypes.DELETE_LOAN_FAIL:
      return deleteLoanFail(state, action);
    case actionsTypes.CREATE_LOAN_START:
      return createLoanStart(state, action);
    case actionsTypes.CREATE_LOAN_SUCCESS:
      return createLoanSuccess(state, action);
    case actionsTypes.CREATE_LOAN_FAIL:
      return createLoanFail(state, action);
    default:
      return state;
  }
};

export default reducer;