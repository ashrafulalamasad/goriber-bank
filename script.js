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
