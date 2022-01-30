import * as actionsTypes from "../../actions/actionsTypes";

const initialState = {
  loginLoading: false,
  message: "",
  registrations: []
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

const registerStart = (state, action) => ({
  ...state,
  registerLoading: true
});

const registerSuccess = (state, action) => ({
  ...state,
  registerLoading: false
});

const registerFail = (state, action) => ({
  ...state,
  registerLoading: false,
  message: action.message
});

const getRegistrationsStart = (state, action) => ({
  ...state,
  getRegistrationsLoading: true
});

const getRegistrationsSuccess = (state, action) => ({
  ...state,
  registrations: [...action.registrations],
  getRegistrationsLoading: false
});

const getRegistrationsFail = (state, action) => ({
  ...state,
  getRegistrationsLoading: false,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionsTypes.LOGIN_START:
        return loginStart(state, action);
      case actionsTypes.LOGIN_SUCCESS:
        return loginSuccess(state, action);
      case actionsTypes.LOGIN_FAIL:
        return loginFail(state, action);
      case actionsTypes.REGISTER_START:
        return registerStart(state, action);
      case actionsTypes.REGISTER_SUCCESS:
        return registerSuccess(state, action);
      case actionsTypes.REGISTER_FAIL:
        return registerFail(state, action);
      case actionsTypes.GET_REGISTRATIONS_START:
        return getRegistrationsStart(state, action);
      case actionsTypes.GET_REGISTRATIONS_SUCCESS:
        return getRegistrationsSuccess(state, action);
      case actionsTypes.GET_REGISTRATIONS_FAIL:
        return getRegistrationsFail(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;