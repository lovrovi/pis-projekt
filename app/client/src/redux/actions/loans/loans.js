import * as actionsTypes from "../actionsTypes"
import axios from "../../../axios"

export const getLoansStart = () => {
    return {
        type: actionsTypes.GET_LOANS_START
    };
};
export const getLoansSuccess = (loans) => {
    return {
        type: actionsTypes.GET_LOANS_SUCCESS,
        loans
    };
};
export const getLoansFail = () => {
    return {
        type: actionsTypes.GET_LOANS_FAIL
    };
};

export const getLoans = (id = 0) => {
    return async (dispatch) => {
        // send request
        dispatch(getLoansStart());
        id = encodeURIComponent(id);
        axios({
            method: "GET",
            url: "/loans",
            params: {
                id
            },
        })
            .then((data) => {
                console.log("getLoans:", data);
                dispatch(getLoansSuccess(data.data));

            })
            .catch((e) => {
                console.error(e);
                dispatch(getLoansFail());
            });
    };
};

export const putLoanStart = () => {
    return {
        type: actionsTypes.PUT_LOAN_START
    };
};
export const putLoanSuccess = () => {
    return {
        type: actionsTypes.PUT_LOAN_SUCCESS
    };
};
export const putLoanFail = () => {
    return {
        type: actionsTypes.PUT_LOAN_FAIL
    };
};

export const putLoan = (loanObj) => {
    return async (dispatch) => {
        // send request
        const loan = {
            
        }

        dispatch(putLoanStart());

        axios({
            method: "PUT",
            url: `/loans/${loanObj.id}`,
            data: loan
        })
            .then((data) => {
                console.log("putLoan:", data);
                dispatch(putLoanSuccess());
                dispatch(getLoans())
            })
            .catch((e) => {
                console.error(e);
                dispatch(putLoanFail());
            });
    };
};

export const deleteLoanStart = () => {
    return {
        type: actionsTypes.DELETE_LOAN_START
    };
};
export const deleteLoanSuccess = (loanId) => {
    return {
        type: actionsTypes.DELETE_LOAN_SUCCESS,
        loanId
    };
};
export const deleteLoanFail = () => {
    return {
        type: actionsTypes.DELETE_LOAN_FAIL
    };
};

export const deleteLoan = (id) => {
    return async (dispatch) => {
        // send request
        dispatch(deleteLoanStart());

        axios({
            method: "DELETE",
            url: `/loans/${id}`
        })
            .then((data) => {
                console.log("deleteLoan:", data);
                dispatch(deleteLoanSuccess(id));
                dispatch(getLoans())
            })
            .catch((e) => {
                console.error(e);
                dispatch(deleteLoanFail());
            });
    };
};

export const createLoanStart = () => {
    return {
        type: actionsTypes.CREATE_LOAN_START
    };
};
export const createLoanSuccess = (loanId) => {
    return {
        type: actionsTypes.CREATE_LOAN_SUCCESS,
        loanId
    };
};
export const createLoanFail = () => {
    return {
        type: actionsTypes.CREATE_LOAN_FAIL
    };
};

export const createLoan = (loanObj) => {
    return async (dispatch) => {
        // send request
        dispatch(createLoanStart());

        axios({
            method: "POST",
            url: "/loans",
            data: loanObj
        })
            .then((data) => {
                console.log("createLoan:", data);
                dispatch(createLoanSuccess());
                dispatch(getLoans())
            })
            .catch((e) => {
                console.error(e);
                dispatch(createLoanFail());
            });
    };
};
