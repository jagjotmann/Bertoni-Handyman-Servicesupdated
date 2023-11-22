const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDBUri =
  "mongodb+srv://seancelli:Xdjdh11991z%21@cluster0.vexkv9d.mongodb.net/";

// Define the schema for quotes
const quoteSchema = new Schema({
  status: String,
  quoteDate: Date,
  revenue: Number,
});

// Create a model from the schema
const Quote = mongoose.model("Quote", quoteSchema);

// Connect to MongoDB
mongoose
  .connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Function to generate report
function generateReport(startDate, endDate) {
  return Quote.aggregate([
    {
      $match: {
        quoteDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: null,
        totalQuotes: { $sum: 1 },
        acceptedQuotes: {
          $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
        },
        declinedQuotes: {
          $sum: { $cond: [{ $eq: ["$status", "declined"] }, 1, 0] },
        },
        totalRevenue: { $sum: "$revenue" },
      },
    },
  ]);
}

// Example use of generateReport function
generateReport("2023-01-01", "2023-01-31")
  .then((report) => console.log("Report:", report))
  .catch((err) => console.error("Error generating report:", err));

export default mongoose.model("Quote", quoteSchema);
