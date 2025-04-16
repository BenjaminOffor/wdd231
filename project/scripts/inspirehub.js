// Wait for the DOM to fully load before executing any scripts
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the JSON data from the scripts folder
    fetch('scripts/inspirehub.json')  // Update the path to reflect the correct location
      .then(response => response.json()) // Parse the JSON data
      .then(data => {
        // Update the quote of the day with a random quote from the JSON
        const quotes = data.quotes;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quoteOfTheDay = quotes[randomIndex];
        
        // Display the random quote in the blockquote with id 'quote'
        const quoteElement = document.getElementById('quote');
        quoteElement.textContent = quoteOfTheDay;
  
        // Display the same random quote in the blockquote with id 'dailyQuote'
        const dailyQuoteElement = document.getElementById('dailyQuote');
        dailyQuoteElement.textContent = quoteOfTheDay;
  
        // Update the year in the footer dynamically
        const yearElement = document.getElementById('year');
        yearElement.textContent = new Date().getFullYear();
      })
      .catch(error => {
        console.error('Error fetching the JSON data:', error);
      });
  });
  