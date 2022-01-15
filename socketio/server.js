const httpServer = require("http").createServer();

const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


module.exports = httpServer;