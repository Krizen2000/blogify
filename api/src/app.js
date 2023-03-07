const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

module.exports = app;
