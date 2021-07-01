require("dotenv").config();
const express = require("express");
const http = require("http");
// const socketio = require('socket.io');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const auth = require("./middleware/auth");

//
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.id === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
//
io.on("connection", (socket) => {
  console.log("a user connected.");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(receiverId);
    console.log(users);
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

//
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use("/user", require("./routes/user.route"));
app.use("/rooms", auth, require("./routes/chat.route"));
app.use("/api", require("./routes/category.route"));
app.use("/api", require("./routes/upload.route"));
app.use("/api", require("./routes/product.route"));
app.use("/api", require("./routes/ad.route"));

//
app.get("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesn't exist",
  });
})
//
const URI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

//
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to db successfully"))
  .catch((e) => console.log(e));

//
app.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});

//
server.listen(PORT, () => {
  console.log("server is listening at", PORT);
});
