import * as actionsTypes from "../actionsTypes"
import axios from "../../../axios"

export const loginStart = () => {
    return {
        type: actionsTypes.LOGIN_START
    };
};
export const loginSuccess = () => {
    return {
        type: actionsTypes.LOGIN_SUCCESS
    };
};
export const loginFail = (message) => {
    return {
        type: actionsTypes.LOGIN_FAIL,
        message
    };
};

export const login = (values, onLoginSuccess) => {
    return async (dispatch) => {
        // send request
        dispatch(loginStart());

        axios({
            method: "POST",
            url: "/login",
            data: values
        })
            .then((data) => {
                console.log("login:", data);
                localStorage.setItem("token", JSON.stringify(data.data.token))
                onLoginSuccess()
                dispatch(loginSuccess());

            })
            .catch((e) => {
                console.error(e);
                dispatch(loginFail("Incorrect login credentials"));
            });
    };
};

export const logoutUser = () => {
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
}

export const handleLogout = () => {
    return (dispatch) => {
        dispatch(logoutUser())
        localStorage.removeItem('token')
    }
}

export const registerStart = () => {
    return {
        type: actionsTypes.REGISTER_START
    };
};
export const registerSuccess = () => {
    return {
        type: actionsTypes.REGISTER_SUCCESS
    };
};
export const registerFail = (message) => {
    return {
        type: actionsTypes.REGISTER_FAIL,
        message
    };
};

export const register = (email) => {
    return async (dispatch) => {
        // send request
        dispatch(registerStart());

        axios({
            method: "POST",
            url: "/register",
            params: email
        })
            .then((data) => {
                console.log("register:", data);
                dispatch(registerSuccess());
            })
            .catch((e) => {
                console.error(e);
                dispatch(registerFail("Incorrect register credentials"));
            });
    };
};

export const getRegistrationsStart = () => {
    return {
        type: actionsTypes.GET_REGISTRATIONS_START
    };
};
export const getRegistrationsSuccess = (registrations) => {
    return {
        type: actionsTypes.GET_REGISTRATIONS_SUCCESS,
        registrations
    };
};
export const getRegistrationsFail = () => {
    return {
        type: actionsTypes.GET_REGISTRATIONS_FAIL,
    };
};

export const getRegistrations = () => {
    return async (dispatch) => {
        // send request
        dispatch(getRegistrationsStart());

        axios({
            method: "GET",
            url: "/register",
        })
            .then((data) => {
                console.log("register:", data);
                dispatch(getRegistrationsSuccess(data.data));
            })
            .catch((e) => {
                console.error(e);
                dispatch(getRegistrationsFail());
            });
    };
};