// server.js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./dist/routes/userRoutes.js");
const quoteRoutes = require("./dist/routes/quoteRoutes.js");
const statusRoutes = require("./dist/routes/statusRoutes.js");
const testimonialRoutes = require("./dist/routes/testimonialRoutes.js");
const emailRoutes = require("./dist/routes/emailRoutes.js");
const LoginRoutes = require("./dist/routes/LoginRoutes.js");
const schedulingRoutes = require("./dist/routes/schedulingRoutes.js");

const process = require("process");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Route middlewares
app.use("/users", userRoutes);
app.use("/quotes", quoteRoutes);
app.use("/status", statusRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/login", LoginRoutes);
app.use("/email", emailRoutes);
app.use("/scheduling", schedulingRoutes);

// Set MongoDB URI based on the environment
const environment = process.env.NODE_ENV || "development";
const mongoDBURi =
  environment === "production"
    ? process.env.PROD_MONGODB_URI
    : process.env.DEV_MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(mongoDBURi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected")) // Log on successful connection
  .catch((err) => console.error("Error connectiong MongoDB: " + err)); // Log on connection error

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the server start
});
