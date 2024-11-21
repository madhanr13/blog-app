const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//Routes
const userRouter = require("./routers/userRoutes");
const staticRouter = require("./routers/staticRoutes");
const blogRouter = require("./routers/blogRoutes");

const { checkForToken } = require("./middlewares/auth");

//Database connect
mongoose
  .connect("mongodb://localhost/BlogData")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect with Mongodb"));

//Middlewares
app.use(express.static(path.resolve("public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForToken);

//Register routes
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);

//Configurations
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

//listen port
app.listen(7000, () => console.log("Server started at port 7000"));
