const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// <<<<-----------Local Import------------->>>>>>
const errorMiddleware = require("./middlewares/error");

//Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught exception");
  process.exit(1);
});

const app = express();
require("dotenv").config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./models/User");
require("./models/Post");
require("./models/Comment");
require("./models/Like");
require("./models/Category");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //   useCreateIndex: true,
  })
  .then((data) => {
    console.log(`mongoDB is connected with: ${data.connection.host}`);
  });

// Routes Imports
const userRouter = require("./routes/user.js");
const projectsRouter = require("./routes/projects");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");
const userRoutes = require("./routes/userRoute");
const categoriesRouter = require("./routes/categories");

app.use(bodyParser.json());

// app.use("/user", userRouter);
app.use("/user", userRoutes);
app.use("/posts", projectsRouter);
app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);
app.use("/categories", categoriesRouter);

//Middleware for Error
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, (req, res) => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close();
  process.exit(1);
});
