const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

const Expenses = require("../models/Expenses");
const Overalls = require("../models/overalls");

// create Expnese

router.post("/create", verifyToken, async (req, res) => {
  const newExpenses = new Expenses(req.body);
  try {
    const saveExpenses = await newExpenses.save();
    const OverallsList = await Overalls.find();
    const totalExpense = parseFloat(req.body.expensevalue);

    OverallsList.forEach((item) => {
      item.overallExpenses = parseFloat(item.overallExpenses) + totalExpense;
    });

    for (const item of OverallsList) {
      await item.save();
    }
    res.status(200).json(saveExpenses);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Expneses

router.get("/", async (req, res) => {
  try {
    const expensesList = await Expenses.find();

    res.status(200).json(expensesList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one Expnese

router.get("/expense/:id",  async (req, res) => {
  try {
    const expense = await Expenses.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: "Expense document not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one Expnese

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expenses.findOneAndRemove({ _id: id });

    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense document not found" });
    }
    const OverallsList = await Overalls.find();
    const totalExpense = parseFloat(deletedExpense.expensevalue);

    OverallsList.forEach((item) => {
      item.overallExpenses = parseFloat(item.overallExpenses) - totalExpense;
    });

    for (const item of OverallsList) {
      await item.save();
    }

    res.status(200).json("The Expense has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// update one Expnese

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedExpense = await Expenses.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      {
        new: true,
      }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense document not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY expenses

router.get("/monthly", verifyTokenAndAdmin, async (req, res) => {
  
  let firstOfTheYear = new Date();
  firstOfTheYear.setMonth(0, 1);
  
  try {
    const expenses = await Expenses.aggregate([
      {
        $match: {
          createdAt: { $gte: firstOfTheYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          expenses: "$expensevalue",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$expenses" },
        },
      },
    ]);

    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
