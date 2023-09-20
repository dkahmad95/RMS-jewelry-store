const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

const Supplier = require("../models/Supplier");
const SupplierTrans = require("../models/SupplierTrans");
const Overalls = require("../models/overalls");

// create SupplierTrans

router.post("/create", verifyToken, async (req, res) => {
  const newSupplierTrans = new SupplierTrans(req.body);
  const supplier = await Supplier.findOne({ suppliername: "Customer" });
  try {
    const saveSupplierTrans = await newSupplierTrans.save();
    const OverallsList = await Overalls.find();
    const total18K = parseFloat(req.body.sTrans.ramliSec.total18KWeight);
    const total21K = parseFloat(req.body.sTrans.ramliSec.total21KWeight);

    if (supplier.suppliername == "Customer") {
      const totalCash = parseFloat(req.body.sTrans.cashSec.cashTotal);
      OverallsList[0].overallCash -= totalCash;
    
    }

    OverallsList.forEach((item) => {
      item.overall18K = parseFloat(item.overall18K) + total18K;
      item.overall21K = parseFloat(item.overall21K) + total21K;
    });

    for (const item of OverallsList) {
      await item.save();
    }
    res.status(200).json(saveSupplierTrans);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all supplier supplierTrans
router.get("/supplier/:supplierId", async (req, res) => {
  try {
    const supplierTransList = await SupplierTrans.find({
      supplierId: req.params.supplierId,
    });
    res.status(200).json(supplierTransList);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get one SupplierTrans

router.get("/trans/:id", async (req, res) => {
  try {
    const supplierTrans = await SupplierTrans.findById(req.params.id);

    if (!supplierTrans) {
      return res
        .status(404)
        .json({ error: "SupplierTrans document not found" });
    }
    res.status(200).json(supplierTrans);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one SupplierTrans

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const supplier = await Supplier.findOne({ suppliername: "Customer" });

  try {
    const { id } = req.params;

    const deletedSupplierTrans = await SupplierTrans.findOneAndRemove({
      _id: id,
    });

    if (!deletedSupplierTrans) {
      return res
        .status(404)
        .json({ error: "SupplierTrans document not found" });
    }
    const OverallsList = await Overalls.find();

    const total18K = parseFloat(
      deletedSupplierTrans.sTrans[0].ramliSec[0].total18KWeight
    );
    const total21K = parseFloat(
      deletedSupplierTrans.sTrans[0].ramliSec[0].total21KWeight
    );

    OverallsList.forEach((item) => {
      item.overall18K = parseFloat(item.overall18K) - total18K;
      item.overall21K = parseFloat(item.overall21K) - total21K;
    });
    if (supplier.suppliername == "Customer") {
      const totalCash = parseFloat(
        deletedSupplierTrans.sTrans[0].cashSec[0].cashTotal
      );
      OverallsList[0].overallCash += totalCash;
    }

    for (const item of OverallsList) {
      await item.save();
    }

    res.status(200).json("The SupplierTrans has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// update one SupplierTrans

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const sTrans = await SupplierTrans.findById(id);
    const old18K = sTrans.sTrans[0].ramliSec[0].total18KWeight;
    const old21K = sTrans.sTrans[0].ramliSec[0].total21KWeight;
    const updatedSupplierTrans = await SupplierTrans.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    if (!updatedSupplierTrans) {
      return res
        .status(404)
        .json({ error: "SupplierTrans document not found" });
    }
    const OverallsList = await Overalls.find();
    const updated18K = parseFloat(
      updatedSupplierTrans.sTrans[0].ramliSec[0].total18KWeight
    );
    const updated21K = parseFloat(
      updatedSupplierTrans.sTrans[0].ramliSec[0].total21KWeight
    );

    OverallsList.forEach((item) => {
      item.overall18K = parseFloat(item.overall18K) - old18K + updated18K;
      item.overall21K = parseFloat(item.overall21K) - old21K + updated21K;
    });

    for (const item of OverallsList) {
      await item.save();
    }

    res.status(200).json(updatedSupplierTrans);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
