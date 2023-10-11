const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

const Supplier = require("../models/Supplier");
const SupplierTrans = require("../models/SupplierTrans");
const Overalls = require("../models/overalls");

// create SupplierTrans

router.post("/create", verifyToken, async (req, res) => {
  const newSupplierTrans = new SupplierTrans(req.body);
  try {
    const saveSupplierTrans = await newSupplierTrans.save();
    const OverallsList = await Overalls.find();
    const supplier = await Supplier.findById(saveSupplierTrans.supplierId);
    const total18K = parseFloat(req.body.sTrans.ramliSec.total18KWeight);
    const total21K = parseFloat(req.body.sTrans.ramliSec.total21KWeight);
    const total24K = parseFloat(req.body.sTrans.ramliSec.total24KWeight);
    const totalPrice18K = parseFloat(req.body.sTrans.cashSec.total18K);
    const totalPrice21K = parseFloat(req.body.sTrans.cashSec.total21K);
    const totalPrice24K = parseFloat(req.body.sTrans.cashSec.total24K);
    const totalCash = parseFloat(req.body.sTrans.cashSec.cashTotal);
    const totalSilver = parseFloat(req.body.sTrans.totalSilver);
    OverallsList.forEach((item) => {
      item.overall18K = parseFloat(item.overall18K) + total18K;
      item.overall21K = parseFloat(item.overall21K) + total21K;
      item.overall24K = parseFloat(item.overall24K) + total24K;

      item.overallSilver = parseFloat(item.overallSilver) + totalSilver;
      if (supplier.suppliername !== "Customer") {
        item.overallPrice18K = parseFloat(item.overallPrice18K) + totalPrice18K;
        item.overallPrice21K = parseFloat(item.overallPrice21K) + totalPrice21K;
        item.overallPrice24K = parseFloat(item.overallPrice24K) + totalPrice24K;
      } else if(supplier.suppliername === "Customer"){
        
        /// subtract the cash from overall cash only when its customer
        item.overallCash = parseFloat(item.overallCash) - totalCash
      }
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

// // delete one SupplierTrans

// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   const supplier = await Supplier.findOne({ suppliername: "Customer" });

//   try {
//     const { id } = req.params;

//     const deletedSupplierTrans = await SupplierTrans.findOneAndRemove({
//       _id: id,
//     });

//     if (!deletedSupplierTrans) {
//       return res
//         .status(404)
//         .json({ error: "SupplierTrans document not found" });
//     }
//     const OverallsList = await Overalls.find();

//     const total18K = parseFloat(
//       deletedSupplierTrans.sTrans[0].ramliSec[0].total18KWeight
//     );
//     const total21K = parseFloat(
//       deletedSupplierTrans.sTrans[0].ramliSec[0].total21KWeight
//     );
//     const total24K = parseFloat(
//       deletedSupplierTrans.sTrans[0].ramliSec[0].total24KWeight
//     );

//     OverallsList.forEach((item) => {
//       item.overall18K = parseFloat(item.overall18K) - total18K;
//       item.overall21K = parseFloat(item.overall21K) - total21K;
//       item.overall24K = parseFloat(item.overall24K) - total24K;
//     });
//     if (supplier.suppliername == "Customer") {
//       const totalCash = parseFloat(
//         deletedSupplierTrans.sTrans[0].cashSec[0].cashTotal
//       );
//       OverallsList[0].overallCash += totalCash;
//     }

//     for (const item of OverallsList) {
//       await item.save();
//     }

//     res.status(200).json("The SupplierTrans has been deleted");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// update one SupplierTrans

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const sTrans = await SupplierTrans.findById(id);
    const supplier = await Supplier.findById(sTrans.supplierId);

    const old18K = sTrans.sTrans[0].ramliSec[0].total18KWeight;
    const old21K = sTrans.sTrans[0].ramliSec[0].total21KWeight;
    const old24K = sTrans.sTrans[0].ramliSec[0].total24KWeight;
    const oldTotalPrice18K = sTrans.sTrans[0].cashSec[0].total18K;
    const oldTotalPrice21K = sTrans.sTrans[0].cashSec[0].total21K;
    const oldTotalPrice24K = sTrans.sTrans[0].cashSec[0].total24K;
    const oldTotalSilver = sTrans.sTrans[0].totalSilver;
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
    const updated24K = parseFloat(
      updatedSupplierTrans.sTrans[0].ramliSec[0].total24KWeight
    );

    const updatedTotalPrice18K = parseFloat(
      updatedSupplierTrans.sTrans[0].cashSec[0].total18K
    );
    const updatedTotalPrice21K = parseFloat(
      updatedSupplierTrans.sTrans[0].cashSec[0].total21K
    );
    const updatedTotalPrice24K = parseFloat(
      updatedSupplierTrans.sTrans[0].cashSec[0].total24K
    );
    const updatedTotalSilver = parseFloat(
      updatedSupplierTrans.sTrans[0].totalSilver
    );

    OverallsList.forEach((item) => {
      item.overall18K = parseFloat(item.overall18K) - old18K + updated18K;
      item.overall21K = parseFloat(item.overall21K) - old21K + updated21K;
      item.overall24K = parseFloat(item.overall24K) - old24K + updated24K;
      item.overallSilver =
        parseFloat(item.overallSilver) - oldTotalSilver + updatedTotalSilver;

      if (supplier.suppliername !== "Customer") {
        item.overallPrice18K =
          parseFloat(item.overallPrice18K) -
          oldTotalPrice18K +
          updatedTotalPrice18K;
        item.overallPrice21K =
          parseFloat(item.overallPrice21K) -
          oldTotalPrice21K +
          updatedTotalPrice21K;
        item.overallPrice24K =
          parseFloat(item.overallPrice24K) -
          oldTotalPrice24K +
          updatedTotalPrice24K;
        const newAvgOjur18K = item.overallPrice18K / item.overall18K;
        item.avgOjur18K = parseFloat(newAvgOjur18K).toFixed(2);
        const newAvgOjur21K = item.overallPrice21K / item.overall21K;
        item.avgOjur21K = parseFloat(newAvgOjur21K).toFixed(2);
      }
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
