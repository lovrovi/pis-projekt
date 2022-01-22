import jwt from "jsonwebtoken";

export const isAdmin = () => {
    let isAdmin = false;
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return false;
    jwt.verify(token, process.env.REACT_APP_SECRET_KEY, function (err, decoded) {
        if (err) {
            return false;
        }
        if (decoded.Role === "Admin") {
            isAdmin = true;
        }
    });
    return isAdmin;
};
