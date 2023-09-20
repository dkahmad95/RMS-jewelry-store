const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    suppliername: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },

    cashFinalBal: {
      type: Number,
      required: true,
      default:0
    },
    ramliFinalBal: {
      type: Number,
      required: true,
      default:0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", supplierSchema);
