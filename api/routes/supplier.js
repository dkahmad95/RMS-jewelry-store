const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

const Supplier = require("../models/Supplier");
const Overalls = require("../models/overalls");

// create Supplier

router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const newSupplier = new Supplier(req.body);
  try {
    const saveSupplier = await newSupplier.save();
    const OverallsList = await Overalls.find();
    const totalRamli = parseFloat(req.body.ramliFinalBal);

    OverallsList.forEach((item) => {
      item.overallRamli = parseFloat(item.overallRamli) + totalRamli;
    });

    for (const item of OverallsList) {
      await item.save();
    }

    res.status(200).json(saveSupplier);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Supplier

router.get("/", async (req, res) => {
  try {
    const supplierList = await Supplier.find();

    res.status(200).json(supplierList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one Supplier

router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ error: "Supplier document not found" });
    }
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one Supplier

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSupplier = await Supplier.findOneAndRemove({ _id: id });

    if (!deletedSupplier) {
      return res.status(404).json({ error: "Supplier document not found" });
    }
    const OverallsList = await Overalls.find();
    const totalRamli = parseFloat(deletedSupplier.ramliFinalBal);

    OverallsList.forEach((item) => {
      item.overallRamli = parseFloat(item.overallRamli) - totalRamli;
    });

    for (const item of OverallsList) {
      await item.save();
    }

    res.status(200).json("The Supplier has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// update one Supplier Trans

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const supplier = await Supplier.findById(req.params.id);
    const oldRamli = supplier.ramliFinalBal;
    // if (supplier.suppliername == "Customer") {
    //   return (oldTotalCustomerCash = parseFloat(supplier.cashFinalBal));
    // }
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    if (!updatedSupplier) {
      return res.status(404).json({ error: "Supplier document not found" });
    }
    const OverallsList = await Overalls.find();
    const totalRamli = parseFloat(updatedSupplier.ramliFinalBal);
    
    OverallsList.forEach((item) => {
      item.overallRamli = parseFloat(item.overallRamli) - oldRamli + totalRamli;
    });
    

    for (const item of OverallsList) {
      await item.save();
    }

    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
