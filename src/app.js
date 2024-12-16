const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Allow the frontend domain
  credentials: true, // Allow cookies with requests
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allow these methods
}));
app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser()); // Parse cookies

// Mount routers with prefixes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Database connection and server start
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
