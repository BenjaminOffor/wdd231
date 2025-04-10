document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById("directory");
    const spotlightContainer = document.getElementById("spotlight");
    const gridBtn = document.getElementById("gridViewBtn");
    const listBtn = document.getElementById("listViewBtn");
    const dateDisplay = document.getElementById("dateDisplay");

    async function fetchMembers() {
        try {
            const response = await fetch("scripts/members.json");
            if (!response.ok) throw new Error("Failed to load member data.");
            const members = await response.json();
            displayMembers(members);
            displaySpotlights(members);
            displayDate();
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

        // Image
        const img = document.createElement("img");
        img.src = `./${member.image}`; // Use image path from JSON directly
        img.alt = `${member.name} logo`;
        card.appendChild(img);

        // Name
        const name = document.createElement("h3");
        name.textContent = member.name;
        card.appendChild(name);

        // Address
        const address = document.createElement("p");
        address.textContent = member.address;
        card.appendChild(address);

        // Phone
        const phone = document.createElement("p");
        phone.textContent = member.phone;
        card.appendChild(phone);

        // Website
        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        card.appendChild(website);

        // Level (optional: can add styles/classes here)
        const level = document.createElement("p");
        level.textContent = `Membership Level: ${member.level}`;
        card.appendChild(level);

        return card;
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function displayDate() {
        const now = new Date();
        dateDisplay.textContent = now.toDateString();
    }

    fetchMembers();

    // Toggle between grid and list view
    gridBtn.addEventListener("click", () => {
        directoryContainer.classList.add("grid-view");
        directoryContainer.classList.remove("list-view");
    });

    listBtn.addEventListener("click", () => {
        directoryContainer.classList.add("list-view");
        directoryContainer.classList.remove("grid-view");
    });
});
