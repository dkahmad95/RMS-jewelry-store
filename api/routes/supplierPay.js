const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

const SupplierPay = require("../models/SupplierPay");
const Supplier = require("../models/Supplier");
const Overall = require("../models/overalls");
// create SupplierPay

router.post("/create", verifyToken, async (req, res) => {
  const newSupplierPay = new SupplierPay(req.body);
  try {
    const saveSupplierPay = await newSupplierPay.save();
    const overallList = await Overall.findOne();
    const supplier = await Supplier.findById(newSupplierPay.supplierId);
    supplier.cashFinalBal -= saveSupplierPay.cashPayment;
    supplier.ramliFinalBal -= saveSupplierPay.totalRamli;
    overallList.overallCash -= saveSupplierPay.cashPayment;
    overallList.overallCash -= saveSupplierPay.cash;
    overallList.overall18K -= saveSupplierPay.weight18K
    overallList.overall21K -= saveSupplierPay.weight21K
    overallList.overall24K -= saveSupplierPay.weight24K
    overallList.overallSilver -= saveSupplierPay.silver
    
    await supplier.save()
    await overallList.save()
    res.status(200).json(saveSupplierPay);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all supplier SupplierPay
router.get("/supplier/:supplierId", async (req, res) => {
  try {
    const SupplierPayList = await SupplierPay.find({
      supplierId: req.params.supplierId,
    });
    res.status(200).json(SupplierPayList);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get one SupplierPay

router.get("/pay/:id", async (req, res) => {
  try {
    const oneSupplierPay = await SupplierPay.findById(req.params.id);

    if (!oneSupplierPay) {
      return res
        .status(404)
        .json({ error: "oneSupplierPay document not found" });
    }
    res.status(200).json(oneSupplierPay);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update one SupplierPay

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    // const supplierPay = await SupplierPay.findById(id);

    const updatedSupplierPay = await SupplierPay.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    if (!updatedSupplierPay) {
      return res.status(404).json({ error: "SupplierPay document not found" });
    }

    res.status(200).json(updatedSupplierPay);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
