import { API } from "../config";

//get user register info
export const registerForm = (userRegister) => {
    return fetch(`${API}/api/user/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: userRegister,
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};

// user login
export const loginForm = (user) => {
    return fetch(`${API}/api/user/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};

//save jwt to local storage
export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};
//is authenticte
export const isAuthenticate = () => {
    if (typeof window == undefined) {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

// create room

export const addRoom = (userid, token, room) => {
    return fetch(`${API}/api/room/create/${userid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: room,
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};

// create Categhory

export const categhoryType = (roomType, token) => {
    return fetch(`${API}/api/room/${roomType}`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};



// user profile
export const userProfile = (userid, token) => {
    return fetch(`${API}/api/user/${userid}`, {
        method: "GET",
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

//update user info
export const upadetUserInfo = (userid, token, userData) => {

    return fetch(`${API}/api/user/update/${userid}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
}
// update user image
export const upadetUserImg = (userid, token, userImg) => {
    return fetch(`${API}/api/user/update/photo/${userid}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: userImg,
    })
        .then((data) => {

            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
}

//update localstorage User
export const updateLocalStorageUser = async (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem('jwt')) {
            let auth = await JSON.parse(localStorage.getItem('jwt'));
            auth.user = user;
            next();
        }
    }
}

// Logout
export const logout = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/api/user/signout`, {
            method: "GET",
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

// create booking

export const addBooking = (userid, token, bookinginfo) => {
    return fetch(`${API}/api/booking/create/${userid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookinginfo),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};


// booking history

export const bookingHistory = (userid, token) => {
    return fetch(`${API}/api/booking/history/${userid}`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

// Room details

export const roomDetail = (roomid, token) => {
    return fetch(`${API}/api/room/details/${roomid}`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};


// Review add

export const addReview = (userid, token, reviewInfo) => {
    return fetch(`${API}/api/ratting/add/${userid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewInfo),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};



// owner booking history

export const ownerHistory = (userid, token) => {
    return fetch(`${API}/api/booking/owner/history/${userid}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};