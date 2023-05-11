const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const communitiesRouter = require("./routes/communityRoute");
const commentRouter = require("./routes/commentRoute");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/communities", communitiesRouter);
app.use("/api/comment", commentRouter);

module.exports = app;
