// routes/group.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const logRequest = require("../middlewares/test");
const Group = require("../models/Group");
const mongoose = require("mongoose");



// logRequest Middleware
router.use(logRequest);

// Create a new group
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const group = new Group({
      name,
      members: [{ userId: req.user.userId }],
    });

    await group.save();

    res.json({ message: "Group created successfully", groupId: group._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add a new member to the group
router.post("/:groupId/addMember", verifyToken, async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { memberName } = req.body;

    // Find the group
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Add the new member
    group.members.push({ userId: req.user.userId });
    await group.save();

    res.json({ message: "Member added to the group", groupId: group._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add an expense to a group
router.post("/:groupId/addExpense", verifyToken, async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { description, amount, beneficiaries } = req.body;

    // Find the group
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }


    // Calculate shares
    const shares = group.calculateShares(amount, beneficiaries);

    // Add the new expense
    const payer = req.user.userId;
    const expense = {
      description,
      amount,
      payer,
      beneficiaries,
      shares,
    };

    group.expenses.push(expense);
    await group.save();

    res.json({ message: "Expense added to the group", groupId: group._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Get split amounts for a group expense
router.get("/:groupId/addExpense/splitAmount", verifyToken, async (req, res) => {
    try {
      console.log("Route: Handling splitAmount request");  
      const groupId = req.params.groupId;
  
      // Find the group
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      // Check if there are any expenses in the group
      if (group.expenses.length === 0) {
        return res.status(404).json({ message: "No expenses found in the group" });
      }
  
      // Get the latest expense from the expenses array
      const latestExpense = group.expenses[group.expenses.length - 1];

      // Use the amount from the latest expense for the calculation
      const totalAmount = latestExpense.amount;


      // Calculate shares
      const shares = group.calculateShares(totalAmount);

      console.log("Route: Sending JSON response");
      res.json({ shares });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});


// Route for Viewing Expenses
router.get("/:groupId/viewExpenses", verifyToken, async (req, res) => {
    try {
      const groupId = req.params.groupId;
  
      // Find the group
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      };
  
      // Check if there are any expenses in the group
      if (group.expenses.length === 0) {
        return res.status(404).json({ message: "No expenses found in the group" });
      };
  
      // Return the list of expenses
      res.json({ expenses: group.expenses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});
  

// Settle Up! 

// Example Route for Settling Expenses
router.delete("/:groupId/settleup", verifyToken, async (req, res) => {
    try {
      const groupId = req.params.groupId;
  
      // Find the group
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
  
      // Check if there are any expenses in the group
      if (group.expenses.length === 0) {
        return res.status(404).json({ message: "No expenses found in the group" });
      }
  
      const payerId = req.user.userId; // Assuming the logged-in user initiates the settlement
  
      // Placeholder logic: Calculate balances dynamically based on expenses
      const balances = {};
  
      group.expenses.forEach(expense => {
        const payerBalance = expense.amount / (expense.beneficiaries.length + 1);
        balances[expense.payer.toString()] = (balances[expense.payer.toString()] || 0) + payerBalance;
  
        expense.beneficiaries.forEach(beneficiary => {
          balances[beneficiary.userId.toString()] = (balances[beneficiary.userId.toString()] || 0) - beneficiary.share;
        });
      });
  
      // Placeholder logic: Calculate each user's net balance
      const payerBalance = balances[payerId] || 0;
  
      const beneficiaryBalances = group.members
        .filter(member => !member.userId.equals(payerId))
        .map(member => ({
          userId: member.userId,
          balance: balances[member.userId.toString()] || 0,
        }));
  
      // Calculate net balances and create settlement transactions
      const totalPayerBalance = payerBalance;
  
      const settlementTransactions = beneficiaryBalances.map(beneficiary => ({
        payer: payerId,
        beneficiary: beneficiary.userId,
        amount: totalPayerBalance / beneficiaryBalances.length, // Equal settlement for simplicity
        settled: true, // You might want to set this to true after the settlement is completed
      }));
  
      // Perform database updates for settlement and expense deletion
      const session = await mongoose.startSession();
      session.startTransaction();
  
      try {
        // Update balances and settle transactions
        group.members.forEach(member => {
            // Ensure that the balances property is initialized
          member.balances = member.balances || {};
          member.balances[payerId] = 0; // Reset payer's balances
          member.balances[member.userId] = balances[member.userId.toString()] || 0;
        });
  
        group.settlements.push(...settlementTransactions);
        group.expenses = []; // Clear expenses
  
        // Save changes to the database
        await group.save();
        await session.commitTransaction();
        session.endSession();
  
        res.json({ settlementTransactions });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  


module.exports = router;
