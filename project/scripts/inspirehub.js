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
  document.getElementById("goalForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const goal = document.getElementById("goal").value;
    const progress = document.getElementById("progress").value;
    
    // Save to localStorage (optional)
    localStorage.setItem("userGoal", goal);
    localStorage.setItem("goalProgress", progress);
  
    document.getElementById("goalOutput").innerHTML =
      `🎉 <strong>Goal:</strong> ${goal}<br>📈 <strong>Progress:</strong> ${progress}%`;
  });
  
  // Load saved goal on page load
  window.addEventListener("load", function () {
    const savedGoal = localStorage.getItem("userGoal");
    const savedProgress = localStorage.getItem("goalProgress");
  
    if (savedGoal && savedProgress) {
      document.getElementById("goalOutput").innerHTML =
        `🎉 <strong>Goal:</strong> ${savedGoal}<br>📈 <strong>Progress:</strong> ${savedProgress}%`;
    }
  });
  async function loadAffirmations() {
    const response = await fetch("scripts/affirmations.json");
    const affirmations = await response.json();
    const affirmationText = document.getElementById("affirmation-text");
    const button = document.getElementById("new-affirmation");
  
    button.addEventListener("click", () => {
      const random = affirmations[Math.floor(Math.random() * affirmations.length)];
      affirmationText.textContent = random;
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadAffirmations();
  });

  async function loadArticles() {
    try {
      const response = await fetch('scripts/articles.json');
      const articles = await response.json();
  
      const container = document.getElementById('articles-section');
      articles.forEach((article, index) => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
  
        const preview = article.content.slice(0, 150); // Preview first 150 characters
  
        articleDiv.innerHTML = `
          <h3>${article.title}</h3>
          <p><strong>By:</strong> ${article.author} | <em>${article.date}</em></p>
          <p id="content-${index}">${preview}...<span class="more-text" style="display:none;">${article.content.slice(150)}</span></p>
          <button class="read-toggle" data-index="${index}">Read More</button>
        `;
  
        container.appendChild(articleDiv);
      });
  
      document.querySelectorAll('.read-toggle').forEach(button => {
        button.addEventListener('click', () => {
          const index = button.dataset.index;
          const moreText = document.querySelector(`#content-${index} .more-text`);
          if (moreText.style.display === 'none') {
            moreText.style.display = 'inline';
            button.textContent = 'Read Less';
          } else {
            moreText.style.display = 'none';
            button.textContent = 'Read More';
          }
        });
      });
  
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  }
  document.addEventListener('DOMContentLoaded', loadArticles);
      