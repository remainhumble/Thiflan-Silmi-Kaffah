// Define an array to store expenses
let expenses = [];
// Initialize total amount
let totalAmount = 0;

// Get references to HTML elements
const categorySelect = document.getElementById("c-select");
const amountInput = document.getElementById("a-input");
const dateInput = document.getElementById("d-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

// Event listener for adding an expense
addBtn.addEventListener("click", function() {
  // Get values from input fields
  const category = categorySelect.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;
  
  // Validate input fields
  if (category === "") {
    alert("Please select a category.");
    return;
  }
  
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }
  
  if (date === "") {
    alert("Please select a date.");
    return;
  }
  
  // Add the new expense to the expenses array
  expenses.push({category, amount, date});
  
  // Update total amount
  totalAmount += amount;
  totalAmountCell.textContent = totalAmount;
  
  // Create a new row in the expenses table
  const newRow = expensesTableBody.insertRow();
  const categoryCell = newRow.insertCell();
  const amountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();
  const deleteBtn = document.createElement("button");
  
  // Set up delete button
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function() {
    // Remove the expense from the array
    expenses.splice(expenses.indexOf(expense), 1);
    
    // Update total amount
    totalAmount -= expense.amount;
    totalAmountCell.textContent = totalAmount;
    
    // Remove the row from the table
    expensesTableBody.removeChild(newRow);
  });
  
  // Get the expense that was just added
  const expense = expenses[expenses.length - 1];
  
  // Populate the new row with expense data
  categoryCell.textContent = expense.category;
  amountCell.textContent = expense.amount;
  dateCell.textContent = expense.date;
  deleteCell.appendChild(deleteBtn);

  // Clear input fields after adding an expense
  categorySelect.value = "";
  amountInput.value = "";
  dateInput.value = "";
});