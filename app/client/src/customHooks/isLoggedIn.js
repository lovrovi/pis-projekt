import jwt  from "jsonwebtoken";

export const isLoggedIn = () => {
    let isVerified = true;
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) return false;
    jwt.verify(token, process.env.REACT_APP_SECRET_KEY, function (err, decoded) {
        if (err) {
            isVerified = false
        }
    });
    return isVerified
}
