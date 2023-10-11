const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth");
const supplierRouter = require("./routes/supplier");
const cTransRouter = require("./routes/cTrans");
const supplierTransRouter = require("./routes/supplierTrans");
const expensesRouter = require("./routes/expenses");
const overallRouter = require("./routes/overall");
const supplierPayRouter = require("./routes/supplierPay");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection is Successfull!"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/auth", authRouter);
app.use("/api/cTrans", cTransRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/supplierTrans", supplierTransRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/overall", overallRouter);
app.use("/api/supplierPay", supplierPayRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
