// Display current time for last login
function updateLastLoginTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  const timeString = `Today, ${displayHours}:${displayMinutes} ${ampm}`;
  const lastLoginElement = document.getElementById("last-login-time");
  if (lastLoginElement) {
    lastLoginElement.textContent = timeString;
  }
}

// Update time when page loads
updateLastLoginTime();

// Get balance element
const balanceElement = document.getElementById("account-balance");
const transactionHistory = document.getElementById("transaction-history");
const emptyState = document.getElementById("empty-state");

// Function to check if history is empty and show/hide empty state
function updateEmptyState() {
  if (transactionHistory.children.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}

// Show empty state on page load
updateEmptyState();

// Function to add transaction to history
function addTransaction(type, amount) {
  const now = new Date();
  const dateTime = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Create new row
  const row = document.createElement("tr");
  row.className = "hover:bg-slate-50 transition-colors";

  // Date & Time cell
  const dateCell = document.createElement("td");
  dateCell.className =
    "px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-slate-700";
  dateCell.textContent = dateTime;

  // Type cell
  const typeCell = document.createElement("td");
  typeCell.className =
    "px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm";
  const typeSpan = document.createElement("span");
  if (type === "Deposit") {
    typeSpan.className =
      "px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold";
    typeSpan.textContent = "Deposit";
  } else {
    typeSpan.className =
      "px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold";
    typeSpan.textContent = "Withdraw";
  }
  typeCell.appendChild(typeSpan);

  // Amount cell
  const amountCell = document.createElement("td");
  amountCell.className =
    "px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold";
  if (type === "Deposit") {
    amountCell.className += " text-green-600";
    amountCell.textContent = "+৳" + amount.toFixed(2);
  } else {
    amountCell.className += " text-red-600";
    amountCell.textContent = "-৳" + amount.toFixed(2);
  }

  // Delete button cell
  const deleteCell = document.createElement("td");
  deleteCell.className = "px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center";
  const deleteBtn = document.createElement("button");
  deleteBtn.className =
    "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm transition-colors";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    const confirmed = confirm(
      "Are you sure you want to delete this transaction? This action cannot be undone."
    );
    if (confirmed) {
      row.remove();
      updateEmptyState();
    }
  });
  deleteCell.appendChild(deleteBtn);

  // Append cells to row
  row.appendChild(dateCell);
  row.appendChild(typeCell);
  row.appendChild(amountCell);
  row.appendChild(deleteCell);

  // Add row to table (at the top)
  transactionHistory.insertBefore(row, transactionHistory.firstChild);

  // Update empty state
  updateEmptyState();
}

// Deposit functionality
document.getElementById("deposit-btn").addEventListener("click", function () {
  const depositInput = document.getElementById("deposit-amount");
  const depositAmount = parseFloat(depositInput.value);

  // Check for invalid input
  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert("Please enter a valid positive amount!");
    depositInput.value = "";
    return;
  }

  // Get current balance from HTML (remove comma first)
  let currentBalance = parseFloat(balanceElement.textContent.replace(/,/g, ""));

  // Add to balance
  currentBalance += depositAmount;
  balanceElement.textContent = currentBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Add to transaction history
  addTransaction("Deposit", depositAmount);

  // Clear input field
  depositInput.value = "";

  alert(`Successfully deposited ৳${depositAmount.toFixed(2)}`);
});

// Withdraw functionality
document.getElementById("withdraw-btn").addEventListener("click", function () {
  const withdrawInput = document.getElementById("withdraw-amount");
  const withdrawAmount = parseFloat(withdrawInput.value);

  // Check for invalid input
  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    alert("Please enter a valid positive amount!");
    withdrawInput.value = "";
    return;
  }

  // Get current balance from HTML (remove comma first)
  let currentBalance = parseFloat(balanceElement.textContent.replace(/,/g, ""));

  // Check for insufficient balance
  if (withdrawAmount > currentBalance) {
    alert("Insufficient balance!");
    withdrawInput.value = "";
    return;
  }

  // Subtract from balance
  currentBalance -= withdrawAmount;
  balanceElement.textContent = currentBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Add to transaction history
  addTransaction("Withdraw", withdrawAmount);

  // Clear input field
  withdrawInput.value = "";

  alert(`Successfully withdrawn ৳${withdrawAmount.toFixed(2)}`);
});
