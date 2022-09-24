import { API } from "../config";

// user login
export const postDonate = (donate) => {
    return fetch(`${API}/api/donation/add`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donate),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};
