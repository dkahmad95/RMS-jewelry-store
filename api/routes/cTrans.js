const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

const CTrans = require("../models/CTrans");
const Overalls = require("../models/overalls");

// create customer trans

router.post("/create", verifyToken, async (req, res) => {
  const newCTrans = new CTrans(req.body);
  try {
    const saveCTrans = await newCTrans.save();
    const OverallsList = await Overalls.findOne();
    const totalCash = parseFloat(req.body.total);
    if (saveCTrans.items[0].item == "18K") {
      OverallsList.overall18K =
        parseFloat(OverallsList.overall18K) - saveCTrans.items[0].weight;
    }
    if (saveCTrans.items[0].item == "21K") {
      OverallsList.overall21K =
        parseFloat(OverallsList.overall21K) - saveCTrans.items[0].weight;
    }

    OverallsList.overallCash = parseFloat(OverallsList.overallCash) + totalCash;

    // for (const item of OverallsList) {
    //   await item.save();
    // }

    await OverallsList.save();

    res.status(200).json(saveCTrans);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get All Customer Trans

router.get("/", async (req, res) => {
  try {
    const cTransList = await CTrans.find();

    res.status(200).json(cTransList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one Customer Trans

router.get("/cTrans/:id", async (req, res) => {
  try {
    const cTrans = await CTrans.findById(req.params.id);

    if (!cTrans) {
      return res.status(404).json({ error: "CTrans document not found" });
    }
    res.status(200).json(cTrans);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one Customer Trans

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCTrans = await CTrans.findOneAndRemove({ _id: id });

    if (!deletedCTrans) {
      return res.status(404).json({ error: "CTrans document not found" });
    }
    const OverallsList = await Overalls.find();
    const totalCash = parseFloat(deletedCTrans.total);

    OverallsList.forEach((item) => {
      item.overallCash = parseFloat(item.overallCash) - totalCash;
    });
    console.log("item", deletedCTrans.items[0].item);
    console.log("weight", deletedCTrans.items[0].weight);
    if (deletedCTrans.items[0].item == "18K") {
      OverallsList.forEach(
        (item) =>
          (item.overall18K =
            parseFloat(item.overall18K) + deletedCTrans.items[0].weight)
      );
    }
    if (deletedCTrans.items[0].item == "21K") {
      OverallsList.forEach(
        (item) =>
          (item.overall21K =
            parseFloat(item.overall21K) + deletedCTrans.items[0].weight)
      );
    }

    for (const item of OverallsList) {
      await item.save();
    }

    res.status(200).json("The CTrans has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// update one Customer Trans

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const cTrans = await CTrans.findById(req.params.id);
    const oldTotal = cTrans.total;
    const updatedCTrans = await CTrans.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    if (!updatedCTrans) {
      return res.status(404).json({ error: "CTrans document not found" });
    }
    const OverallsList = await Overalls.find();
    const totalCash = parseFloat(updatedCTrans.total);

    OverallsList.forEach((item) => {
      item.overallCash = parseFloat(item.overallCash) - oldTotal + totalCash;
    });

    for (const item of OverallsList) {
      await item.save();
    }

    res.status(200).json(updatedCTrans);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  
  let firstOfTheYear = new Date();
  firstOfTheYear.setMonth(0, 1);

  try {
    const income = await CTrans.aggregate([
      {
        $match: {
          createdAt: { $gte: firstOfTheYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
