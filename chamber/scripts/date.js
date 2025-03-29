// Insert the current year dynamically
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Insert the last modified date
document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;
console.log("Script Loaded");
