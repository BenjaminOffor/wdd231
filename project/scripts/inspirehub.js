document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    yearSpan.textContent = new Date().getFullYear();
  
    const quotes = [
      "Believe you can and you're halfway there. — Theodore Roosevelt",
      "Act as if what you do makes a difference. It does. — William James",
      "Success is not how high you have climbed, but how you make a positive difference to the world. — Roy T. Bennett",
      "Happiness is not something ready made. It comes from your own actions. — Dalai Lama",
      "Don't watch the clock; do what it does. Keep going. — Sam Levenson"
    ];
  
    const dailyQuote = document.getElementById("dailyQuote");
    const quoteIndex = new Date().getDate() % quotes.length;
    dailyQuote.textContent = quotes[quoteIndex];
  });
  