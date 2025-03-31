document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById("directory");
    const toggleButton = document.getElementById("toggleView");

    async function fetchMembers() {
        try {
            const response = await fetch("scripts/members.json");
            if (!response.ok) {
                throw new Error("Failed to load member data.");
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            directoryContainer.innerHTML = `<p class="error">Failed to load member data. Please try again later.</p>`;
            console.error("Error fetching member data:", error);
        }
    }

    function displayMembers(members) {
        directoryContainer.innerHTML = "";

        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p class="membership-level">Membership Level: ${member.level}</p>
            `;

            directoryContainer.appendChild(memberCard);
        });
    }

    toggleButton.addEventListener("click", () => {
        directoryContainer.classList.toggle("grid-view");
    
        if (directoryContainer.classList.contains("grid-view")) {
            toggleButton.textContent = "Switch to List View";
        } else {
            toggleButton.textContent = "Switch to Grid View";
        }
    });
    

// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Get the buttons
    const gridBtn = document.querySelector("#gridViewBtn");
    const listBtn = document.querySelector("#listViewBtn");
    const membersContainer = document.querySelector(".members-container");

    // Check if elements exist before adding event listeners
    if (gridBtn && listBtn && membersContainer) {
        // Switch to Grid View
        gridBtn.addEventListener("click", function () {
            membersContainer.classList.add("grid-view");
            membersContainer.classList.remove("list-view");
        });

        // Switch to List View
        listBtn.addEventListener("click", function () {
            membersContainer.classList.add("list-view");
            membersContainer.classList.remove("grid-view");
        });
    } else {
        console.error("One or more elements are missing in directory.html.");
    }
});

