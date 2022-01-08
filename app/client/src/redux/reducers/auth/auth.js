import * as actionsTypes from "../../actions/actionsTypes";

const initialState = {
  loginLoading: false,
  message: ""
};

// books
const loginStart = (state, action) => ({
  ...state,
  loginLoading: true
});

const loginSuccess = (state, action) => ({
  ...state,
  loginLoading: false
});

const loginFail = (state, action) => ({
  ...state,
  loginLoading: false,
  message: action.message
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionsTypes.LOGIN_START:
        return loginStart(state, action);
      case actionsTypes.LOGIN_SUCCESS:
        return loginSuccess(state, action);
      case actionsTypes.LOGIN_FAIL:
        return loginFail(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;