const mongoose = require("mongoose");

const supplierTransSchema = new mongoose.Schema(
  {
    supplierId: { type: String, required: true },
    sTrans: [
      {
        items: [
          {
            item: {
              type: String,
            },
            weight: {
              type: Number,
            },
            desc: {
              type: String,
            },
            unitPrice: {
              type: Number,
            },
          },
        ],

        ramliSec: [
          {
            total18KWeight: {
              type: Number,
            },
            total21KWeight: {
              type: Number,
            },
            w18KtoRamli: {
              type: Number,
            },
            w21KtoRamli: {
              type: Number,
            },
            ramliTotal: {
              type: Number,
            },
            ramliOldBal: {
              type: Number,
            },
            ramliFinalBal: {
              type: Number,
            },
          },
        ],
        cashSec: [
          {
            cashTotal: {
              type: Number,
            },
            cashOldBal: {
              type: Number,
            },
            cashFinalBal: {
              type: Number,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupplierTrans", supplierTransSchema);
