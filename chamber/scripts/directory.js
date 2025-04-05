document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById("directory");
    const spotlightContainer = document.getElementById("spotlight"); // Add this container in your HTML
    const gridBtn = document.getElementById("gridViewBtn");
    const listBtn = document.getElementById("listViewBtn");

    async function fetchMembers() {
        try {
            const response = await fetch("scripts/members.json");
            if (!response.ok) throw new Error("Failed to load member data.");

            const members = await response.json();
            displayMembers(members);
            displaySpotlights(members); // New: for dynamic spotlights!
        } catch (error) {
            const errorMsg = `<p class="error">Failed to load member data. Please try again later.</p>`;
            if (directoryContainer) directoryContainer.innerHTML = errorMsg;
            if (spotlightContainer) spotlightContainer.innerHTML = errorMsg;
            console.error("Error fetching member data:", error);
        }
    }

    function displayMembers(members) {
        if (!directoryContainer) return;
        directoryContainer.innerHTML = "";

        members.forEach(member => {
            const memberCard = createMemberCard(member);
            directoryContainer.appendChild(memberCard);
        });
    }

    function displaySpotlights(members) {
        if (!spotlightContainer) return;
        spotlightContainer.innerHTML = "";

        // Filter Gold or Silver members
        const premiumMembers = members.filter(member =>
            member.level === "Gold" || member.level === "Silver"
        );

        // Randomize and pick 2 or 3
        const selectedMembers = shuffleArray(premiumMembers).slice(0, 3);

        selectedMembers.forEach(member => {
            const spotlightCard = createMemberCard(member, true);
            spotlightContainer.appendChild(spotlightCard);
        });
    }

    function createMemberCard(member, isSpotlight = false) {
        const card = document.createElement("div");
        card.classList.add(isSpotlight ? "spotlight-card" : "member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" style="width:100px; height:100px; border-radius:50%;">
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
            <p class="membership-level">Membership Level: ${member.level}</p>
        `;
        return card;
    }

    function shuffleArray(array) {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    if (gridBtn && listBtn && directoryContainer) {
        gridBtn.addEventListener("click", () => {
            directoryContainer.classList.add("grid-view");
            directoryContainer.classList.remove("list-view");
        });

        listBtn.addEventListener("click", () => {
            directoryContainer.classList.add("list-view");
            directoryContainer.classList.remove("grid-view");
        });
    } else {
        console.error("One or more elements (gridViewBtn, listViewBtn, directory) are missing in directory.html.");
    }

    fetchMembers();
});
document.addEventListener("DOMContentLoaded", () => {
    // Set the timestamp when the page loads
    document.getElementById("timestamp").value = new Date().toISOString();

    // Code to handle modal behavior
    const modals = document.querySelectorAll('.modal');
    const openLinks = document.querySelectorAll('[data-toggle="modal"]');

    openLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const modalId = event.target.getAttribute('href').substring(1);
            document.getElementById(modalId).style.display = 'block';
        });
    });

    // Close modal functionality
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Add close functionality to modals
    modals.forEach(modal => {
        const closeButton = modal.querySelector('button');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });
});
