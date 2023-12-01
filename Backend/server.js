const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./dist/routes/userRoutes.js");
const testimonialRoutes = require("./dist/routes/testimonialRoutes.js");
const emailRoutes = require("./dist/routes/emailRoutes.js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/testimonials", testimonialRoutes);
app.use("/emails", emailRoutes);

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
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
