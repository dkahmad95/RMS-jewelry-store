const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    expensename: {
      type: String,
      required: false,
    },
    expensevalue: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", expensesSchema);
