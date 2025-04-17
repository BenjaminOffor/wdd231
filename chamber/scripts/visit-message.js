const messageElement = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const difference = now - lastVisit;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (days < 1) {
    messageElement.textContent = "Back so soon! Awesome!";
  } else {
    messageElement.textContent = `You last visited ${days} day${days > 1 ? 's' : ''} ago.`;
  }
}
localStorage.setItem("lastVisit", now);
