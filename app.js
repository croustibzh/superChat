const express = require('express')
const app = express()

//set template engine EJS 
app.set("view engine", 'ejs')

//middleware
app.use(express.static('public'))


//ROUTES 
app.get('/', (req,res) => {
    res.render("index")
})

//Listen to port 3000
server = app.listen(3000)

//instantiate input/output
const io = require("socket.io")(server)


//detect connection
io.on('connect', (socket) => {

    console.log("New user connected")

    socket.username = "Anonymous"
    
    socket.on("change_username", (data) => {
        socket.username = data.username
        console.log(data.username)
    })

    socket.on("new_message", (data) => {
        io.sockets.emit("new_message", {message: data.message , username: socket.username})
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit("typing" , {username : socket.username})
    })

    socket.on('left', (data) => {
        socket.broadcast.emit("left")
    })
})