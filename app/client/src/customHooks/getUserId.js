import jwt from "jsonwebtoken";

export const getUserId = () => {
    let userId = 0;
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return 0;
    jwt.verify(token, process.env.REACT_APP_SECRET_KEY, function (err, decoded) {
        if (err) {
            return 0;
        }
        userId = decoded.Id;
    });
    return userId;
};
