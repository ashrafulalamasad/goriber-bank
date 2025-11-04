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

// Deposit functionality
document.getElementById("deposit-btn").addEventListener("click", function() {
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
  balanceElement.textContent = currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  
  // Clear input field
  depositInput.value = "";
  
  alert(`Successfully deposited ৳${depositAmount.toFixed(2)}`);
});

// Withdraw functionality
document.getElementById("withdraw-btn").addEventListener("click", function() {
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
  balanceElement.textContent = currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  
  // Clear input field
  withdrawInput.value = "";
  
  alert(`Successfully withdrawn ৳${withdrawAmount.toFixed(2)}`);
});
