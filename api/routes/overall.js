const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

const overall = require("../models/overalls");

// create overall

router.post("/create", verifyToken, async (req, res) => {
  const newOverall = new overall(req.body);
  try {
    const saveoverall = await newOverall.save();
    res.status(200).json(saveoverall);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All overalls

router.get("/", async (req, res) => {
  try {
    const overallList = await overall.find();

    res.status(200).json(overallList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one overall

router.get("/:id", async (req, res) => {
  try {
    const overall = await overall.findById(req.params.id);

    if (!overall) {
      return res.status(404).json({ error: "overall document not found" });
    }
    res.status(200).json(overall);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one overall

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOverall = await overall.findOneAndRemove({ _id: id });

    if (!deletedOverall) {
      return res.status(404).json({ error: "Overall document not found" });
    }

    res.status(200).json("The Overall has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// update one overall

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedOverall = await overall.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    if (!updatedOverall) {
      return res.status(404).json({ error: "Overall document not found" });
    }

    res.status(200).json(updatedOverall);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
