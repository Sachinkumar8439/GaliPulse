// packeges import 
const express = require("express");
const {Server} = require("socket.io");
const dotenv = require('dotenv');
const {createServer} = require("http");
const cors = require("cors");

const app = express();
dotenv.config();


// files import 
const SocketConnection = require("./controllers/socket");
const route = require("./routes/route");
const databaseConnect = require("./configue/database");



// database connection
databaseConnect();


// routes using
app.use("/galipulse/app-1.0",route);


app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","PUSH","PUT","DELETE"],
    Credential:true,
}))


app.get('/',(req,res)=>{
    res.send("Hello User")
})

// server listening
const server = createServer(app);
const PORT = process.env.PORT || 4000;
server.listen(PORT,()=>{
    console.log("server started at:",PORT);
});


// socket setup 
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","PUSH","PUT","DELETE"],
        Credential:true,
    }
});

io.on("connection",SocketConnection);


