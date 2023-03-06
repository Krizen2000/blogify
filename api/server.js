const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./src/app");

dotenv.config();
const PORT = process.env.PORT || 3120;

// mongoose
// .connect(process.env.MONGO_URI || "127.0.0.1")
// .then((conn) => console.log(`MongoDB Connected: ${conn.connection.host}`))
// .catch((err) => console.log(err));

// app.listen(PORT, () => console.log("Listening for requests..."));

// * For Serverless hosting
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "127.0.0.1");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
//
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Listening for requests...");
  });
});
