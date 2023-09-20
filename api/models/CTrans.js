const mongoose = require("mongoose");

const cTransSchema = new mongoose.Schema(
  [
    {
      customername: {
        type: String,
        required: false,
      },
      phone: {
        type: Number,
        required: false,
      },
      items: [
        {
          id: {
            type: Number,
          },
          item: {
            type: String,
            required: false,
          },
          weight: {
            type: Number,
            required: false,
          },
          desc: {
            type: String,
            required: false,
          },
          unitPrice: {
            type: Number,
            required: false,
          },
          itemTotal: {
            type: Number,
            required: false,
          },
        },
      ],

      total: {
        type: Number,
        required: false,
      },
    },
  ],
  { timestamps: true }
);

module.exports = mongoose.model("CTrans", cTransSchema);
