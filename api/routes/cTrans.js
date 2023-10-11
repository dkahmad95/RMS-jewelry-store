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
    for (let i = 0; i < saveCTrans.items.length; i++) {
      const currentItem = saveCTrans.items[i];

      switch (currentItem.item) {
        case "18K":
          OverallsList.overall18K -= parseFloat(currentItem.weight);
          const transOjur18K = parseFloat(OverallsList.avgOjur18K) * parseFloat(currentItem.weight);
          OverallsList.overallPrice18K =OverallsList.overallPrice18K - transOjur18K
          
          OverallsList.avgOjur18K= parseFloat( ((OverallsList.overallPrice18K)/ (OverallsList.overall18K))).toFixed(2)
        
          console.log("OverallsList.avgOjur18K",OverallsList.avgOjur18K)
          break;
        case "21K":
          OverallsList.overall21K -= parseFloat(currentItem.weight);
          const transOjur21K = parseFloat(OverallsList.avgOjur21K) * parseFloat(currentItem.weight);
          OverallsList.overallPrice21K =OverallsList.overallPrice21K - transOjur21K
          
          OverallsList.avgOjur21K= parseFloat( ((OverallsList.overallPrice21K)/ (OverallsList.overall21K))).toFixed(2)
        
          console.log("OverallsList.avgOjur21K",OverallsList.avgOjur21K)
          break;
        case "24K":
          OverallsList.overall24K -= parseFloat(currentItem.weight);
          break;
        case "Silver":
          OverallsList.overallSilver -= parseFloat(currentItem.weight);
          break;
      }
    }
    OverallsList.overallCash = parseFloat(OverallsList.overallCash) + totalCash;

 

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
    const OverallsList = await Overalls.findOne();
    const totalCash = parseFloat(deletedCTrans.total);

    OverallsList.overallCash = parseFloat(OverallsList.overallCash) - totalCash;

    for (let i = 0; i < deletedCTrans.items.length; i++) {
      const currentItem = deletedCTrans.items[i];

      switch (currentItem.item) {
        case "18K":
          OverallsList.overall18K += parseFloat(currentItem.weight);
          const transOjur18K = parseFloat(OverallsList.avgOjur18K) * parseFloat(currentItem.weight);
          OverallsList.overallPrice18K =OverallsList.overallPrice18K - transOjur18K
          
          OverallsList.avgOjur18K= parseFloat( ((OverallsList.overallPrice18K)/ (OverallsList.overall18K))).toFixed(2)
        
          console.log("OverallsList.avgOjur18K",OverallsList.avgOjur18K)
          break;
        case "21K":
          OverallsList.overall21K += parseFloat(currentItem.weight);
          const transOjur21K = parseFloat(OverallsList.avgOjur21K) * parseFloat(currentItem.weight);
          OverallsList.overallPrice21K =OverallsList.overallPrice21K - transOjur21K
          
          OverallsList.avgOjur21K= parseFloat( ((OverallsList.overallPrice21K)/ (OverallsList.overall21K))).toFixed(2)
        
          console.log("OverallsList.avgOjur21K",OverallsList.avgOjur21K)
          break;
        case "24K":
          OverallsList.overall24K += parseFloat(currentItem.weight);
          break;
        case "Silver":
          OverallsList.overallSilver += parseFloat(currentItem.weight);
          break;
      }
      console.log("item", currentItem.item);
      console.log("weight", currentItem.weight);
    }

    await OverallsList.save();

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
    const OverallsList = await Overalls.findOne();

    for (
      let i = 0;
      i < cTrans.items.length && i < updatedCTrans.items.length;
      i++
    ) {
      const oldItem = cTrans.items[i];
      const updatedItem = updatedCTrans.items[i];

      if (oldItem.item === "18K" && updatedItem.item === "18K") {
        OverallsList.overall18K =
          (parseFloat(OverallsList.overall18K) -
          parseFloat(oldItem.weight)) +
          parseFloat(updatedItem.weight);
          const transOjur18K = parseFloat(OverallsList.avgOjur18K) * parseFloat(updatedItem.weight);
          OverallsList.overallPrice18K =OverallsList.overallPrice18K + transOjur18K
          
          OverallsList.avgOjur18K= parseFloat( ((OverallsList.overallPrice18K)/ (OverallsList.overall18K))).toFixed(2)
        
          console.log("OverallsList.avgOjur18K",OverallsList.avgOjur18K)
      } else if (oldItem.item === "21K" && updatedItem.item === "21K") {
        OverallsList.overall21K =
         ( parseFloat(OverallsList.overall21K) -
          parseFloat(oldItem.weight)) +
          parseFloat(updatedItem.weight);
          const transOjur21K = parseFloat(OverallsList.avgOjur21K) * parseFloat(updatedItem.weight);
          OverallsList.overallPrice21K =OverallsList.overallPrice21K + transOjur21K
          
          OverallsList.avgOjur21K= parseFloat( ((OverallsList.overallPrice21K)/ (OverallsList.overall21K))).toFixed(2)
        
          console.log("OverallsList.avgOjur21K",OverallsList.avgOjur21K)
      } else if (oldItem.item === "24K" && updatedItem.item === "24K") {
        OverallsList.overall24K =
          (parseFloat(OverallsList.overall24K) -
          parseFloat(oldItem.weight)) +
          parseFloat(updatedItem.weight);
      } else if (oldItem.item === "Silver" && updatedItem.item === "Silver") {
        OverallsList.silver =
          (parseFloat(OverallsList.silver) -
          parseFloat(oldItem.weight)) +
          parseFloat(updatedItem.weight);
      }
    }

    const totalCash = parseFloat(updatedCTrans.total);

    OverallsList.overallCash =
      parseFloat(OverallsList.overallCash) - oldTotal + totalCash;

    await OverallsList.save();

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
