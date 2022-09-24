import { API } from "../config";

// create new conversation
export const createConversations = (userId, token, receiverId) => {
    return fetch(`${API}/api/conversation/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        Authorization: `Bearer ${token}`,
        body: JSON.stringify({ receiverId })
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

// get user all conversation
export const getConversations = (userId, token) => {
    return fetch(`${API}/api/conversation/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        Authorization: `Bearer ${token}`
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};


// get all messages of a chat
export const getAllMessages = (token, conversationId) => {
    return fetch(`${API}/api/message/${conversationId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        Authorization: `Bearer ${token}`
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

//send user new msg to backend
export const sendNewMessage = (userId, token, msg) => {
    return fetch(`${API}/api/message/add/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        Authorization: `Bearer ${token}`,
        body: JSON.stringify(msg)
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
