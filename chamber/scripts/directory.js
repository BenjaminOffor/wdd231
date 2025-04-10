document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById("directory");
    const spotlightContainer = document.getElementById("spotlight");
    const gridBtn = document.getElementById("gridViewBtn");
    const listBtn = document.getElementById("listViewBtn");
    const dateDisplay = document.getElementById("dateDisplay");

    const modals = document.querySelectorAll('.modal');
    const openLinks = document.querySelectorAll('[data-toggle="modal"]');

    async function fetchMembers() {
        try {
            const response = await fetch("scripts/members.json");
            if (!response.ok) throw new Error("Failed to load member data.");
            const members = await response.json();
            displayMembers(members);
            displaySpotlights(members);
            displayDate(); // Fixed: no argument needed
        } catch (error) {
            const errorMsg = `<p class="error">Failed to load member data. Please try again later.</p>`;
            directoryContainer.innerHTML = errorMsg;
            spotlightContainer.innerHTML = errorMsg;
            console.error("Error fetching member data:", error);
        }
    }

    function displayMembers(members) {
        directoryContainer.innerHTML = "";
        members.forEach(member => {
            const memberCard = createMemberCard(member);
            directoryContainer.appendChild(memberCard);
        });
    }

    function displaySpotlights(members) {
        spotlightContainer.innerHTML = "";
        const premiumMembers = members.filter(member =>
            member.level === "Gold" || member.level === "Silver"
        );
        const selectedMembers = shuffleArray(premiumMembers).slice(0, 3);
        selectedMembers.forEach(member => {
            const spotlightCard = createMemberCard(member, true);
            spotlightContainer.appendChild(spotlightCard);
        });
    }

    function createMemberCard(member, isSpotlight = false) {
        const card = document.createElement("div");
        card.classList.add(isSpotlight ? "spotlight-card" : "member-card");

        const img = document.createElement("img");
        img.src = member.image; // ✅ FIXED: Use member.image directly
        img.alt = `${member.name} logo`;

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        return card;
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function displayDate() {
        if (dateDisplay) {
            const now = new Date();
            dateDisplay.textContent = now.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }
    }

    // Toggle view buttons
    gridBtn.addEventListener("click", () => {
        directoryContainer.classList.add("grid-view");
        directoryContainer.classList.remove("list-view");
    });

    listBtn.addEventListener("click", () => {
        directoryContainer.classList.add("list-view");
        directoryContainer.classList.remove("grid-view");
    });

    // Modal handling (optional, depending on your modals)
    openLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const modalId = link.getAttribute('href');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    window.addEventListener('click', event => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    fetchMembers();
});
