//setup
const io = require("socket.io")(8999, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = [];

// add new user
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}

//remove user
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

// get user
const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}



//connection
io.on('connection', (socket) => {

    // add new user
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    //send and get message 
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
        }

    })


    //remove user
    socket.on("disconnect", () => {
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})