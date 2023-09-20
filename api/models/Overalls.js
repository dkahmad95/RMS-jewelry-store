const mongoose = require("mongoose");

const overallsSchema = new mongoose.Schema(
  {
    overallCash: {
      type: Number,
      required: false,
    },
    overallExpenses: {
      type: Number,
      required: false,
    },
    overall18K: {
      type: Number,
      required: false,
    },
    overall21K: {
      type: Number,
      required: false,
    },
    overallRamli: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Overalls", overallsSchema);
