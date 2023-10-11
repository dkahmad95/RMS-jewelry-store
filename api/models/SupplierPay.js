const mongoose = require("mongoose");

const supplierPaySchema = new mongoose.Schema(
  {
    supplierId: {
      type: String,
      required: true,
    },
    oldRamliBal: {
      type: Number,
    },

    weight18K: {
      type: Number,
    },
    ramli18K: {
      type: Number,
    },
    weight21K: {
      type: Number,
    },
    ramli21K: {
      type: Number,
    },
    weight24K: {
      type: Number,
    },
    silver: {
      type: Number,
    },
    cash: {
      type: Number,
    },
    cashToRamli: {
      type: Number,
    },
    totalRamli: {
      type: Number,
    },
    finalRamliBal: {
      type: Number,
    },
    oldCashBal: {
      type: Number,
    },
    cashPayment: {
      type: Number,
    },
    finalCashBal: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupplierPay", supplierPaySchema);
