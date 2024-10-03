const mongoose = require('mongoose');

// Define a schema
const expenseSchema = new mongoose.Schema({
  personName: String,
  contribution: Number,
  remaining: Number,
  totalAmount: Number,
});

// Create a model
const Expense = mongoose.model('Expense', expenseSchema);

// Function to save data
const saveExpense = async (personName, contribution, remaining, totalAmount) => {
  try {
    const expense = new Expense({
      personName,
      contribution,
      remaining,
      totalAmount,
    });

    await expense.save();
    console.log('Expense saved successfully');
  } catch (error) {
    console.error('Error saving expense:', error);
  }
};
