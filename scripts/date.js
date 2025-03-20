document.addEventListener("DOMContentLoaded", function () {
    // Set Copyright Year Dynamically
    document.getElementById("copyright-year").textContent = new Date().getFullYear();

    // Set Last Modified Date Dynamically
    document.getElementById("lastModified").textContent = document.lastModified;
});
