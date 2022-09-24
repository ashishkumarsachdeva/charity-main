import { API } from "./config";

//get user info
export const getUserInfo = (userId, token) => {
    return fetch(`${API}/api/user/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};