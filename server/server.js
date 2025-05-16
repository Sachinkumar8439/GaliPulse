require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const session = require("express-session");
const products = require("./Data/products.json")
// const object  = JSON.parse(products);
console.log("producs are ",products.products[0])

mongoose
  .connect("mongodb://127.0.0.1:27017/RTBechO", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const { initSocket } = require("./Controllers/socket");
initSocket(server);
// yaha route import karne hain lala
const userroute = require("./routes/userRoute");
const dataroute = require("./routes/dataRoutes")
app.use("/", userroute);
app.use("/data", dataroute);



const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
