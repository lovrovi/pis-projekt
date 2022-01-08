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
