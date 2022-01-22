import * as actionsTypes from "../../actions/actionsTypes";

const initialState = {
  users: [],
  getUsersLoading: false
};

// get users

const getUsersStart = (state, action) => ({
  ...state,
  getUsersLoading: true
});

const getUsersSuccess = (state, action) => ({
  ...state,
  users: [...action.users],
  getUsersLoading: false
});

const getUsersFail = (state, action) => ({
  ...state,
  getUsersLoading: false
});

// delete user

const deleteUserStart = (state, action) => ({
  ...state
});

const deleteUserSuccess = (state, action) => ({
  ...state,
  users: [...state.users.filter(user => user.id !== action.userId)]
});

const deleteUserFail = (state, action) => ({
  ...state
});

//create user

const createUserStart = (state, action) => ({
  ...state
});

const createUserSuccess = (state, action) => ({
  ...state,
});

const createUserFail = (state, action) => ({
  ...state
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_USERS_START:
      return getUsersStart(state, action);
    case actionsTypes.GET_USERS_SUCCESS:
      return getUsersSuccess(state, action);
    case actionsTypes.GET_USERS_FAIL:
      return getUsersFail(state, action);
    case actionsTypes.DELETE_USER_START:
      return deleteUserStart(state, action);
    case actionsTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    case actionsTypes.DELETE_USER_FAIL:
      return deleteUserFail(state, action);
    case actionsTypes.CREATE_USER_START:
      return createUserStart(state, action);
    case actionsTypes.CREATE_USER_SUCCESS:
      return createUserSuccess(state, action);
    case actionsTypes.CREATE_USER_FAIL:
      return createUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;