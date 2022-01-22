import * as actionsTypes from "../actionsTypes"
import axios from "../../../axios"

export const getUsersStart = () => {
    return {
        type: actionsTypes.GET_USERS_START
    };
};
export const getUsersSuccess = (users) => {
    return {
        type: actionsTypes.GET_USERS_SUCCESS,
        users
    };
};
export const getUsersFail = () => {
    return {
        type: actionsTypes.GET_USERS_FAIL
    };
};

export const getUsers = (search = "") => {
    return async (dispatch) => {
        // send request
        dispatch(getUsersStart());
        search = encodeURIComponent(search);
        axios({
            method: "GET",
            url: "/users",
            params: {
                search
            },
        })
            .then((data) => {
                console.log("getUsers:", data);
                dispatch(getUsersSuccess(data.data));

            })
            .catch((e) => {
                console.error(e);
                dispatch(getUsersFail());
            });
    };
};

export const deleteUserStart = () => {
    return {
        type: actionsTypes.DELETE_USER_START
    };
};
export const deleteUserSuccess = (userId) => {
    return {
        type: actionsTypes.DELETE_USER_SUCCESS,
        userId
    };
};
export const deleteUserFail = () => {
    return {
        type: actionsTypes.DELETE_USER_FAIL
    };
};

export const deleteUser = (id) => {
    return async (dispatch) => {
        // send request
        dispatch(deleteUserStart());

        axios({
            method: "DELETE",
            url: `/users/${id}`
        })
            .then((data) => {
                console.log("deleteUser:", data);
                dispatch(deleteUserSuccess(id));
                dispatch(getUsers())
            })
            .catch((e) => {
                console.error(e);
                dispatch(deleteUserFail());
            });
    };
};

export const createUserStart = () => {
    return {
        type: actionsTypes.CREATE_USER_START
    };
};
export const createUserSuccess = (userId) => {
    return {
        type: actionsTypes.CREATE_USER_SUCCESS,
        userId
    };
};
export const createUserFail = () => {
    return {
        type: actionsTypes.CREATE_USER_FAIL
    };
};

export const createUser = (userObj) => {
    return async (dispatch) => {
        // send request
        dispatch(createUserStart());
        const user = {
            id: userObj.id,
            name: userObj.name,
            address: {
                road: userObj.road,
                zipCode: userObj.zipCode,
                city: userObj.city,
                country: userObj.country
            }
        }

        axios({
            method: "POST",
            url: "/users",
            data: user
        })
            .then((data) => {
                console.log("createUser:", data);
                dispatch(createUserSuccess());
                dispatch(getUsers())
            })
            .catch((e) => {
                console.error(e);
                dispatch(createUserFail());
            });
    };
};
