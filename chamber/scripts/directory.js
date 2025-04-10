document.addEventListener("DOMContentLoaded", () => {
    const directoryContainer = document.getElementById("directory");
    const spotlightContainer = document.getElementById("spotlight");
    const gridBtn = document.getElementById("gridViewBtn");
    const listBtn = document.getElementById("listViewBtn");
    const dateDisplay = document.getElementById("dateDisplay");

    const modals = document.querySelectorAll('.modal');
    const openLinks = document.querySelectorAll('[data-toggle="modal"]');

    // ✅ Toggle view event listeners
    if (gridBtn && listBtn && directoryContainer) {
        gridBtn.addEventListener("click", () => {
            directoryContainer.classList.add("grid-view");
            directoryContainer.classList.remove("list-view");
            gridBtn.classList.add("active");
            listBtn.classList.remove("active");
        });

        listBtn.addEventListener("click", () => {
            directoryContainer.classList.add("list-view");
            directoryContainer.classList.remove("grid-view");
            listBtn.classList.add("active");
            gridBtn.classList.remove("active");
        });
    }

    // Fetch members data
    async function fetchMembers() {
        try {
            const response = await fetch("scripts/members.json");
            if (!response.ok) throw new Error("Failed to load member data.");
            const members = await response.json();
            displayMembers(members);
            displaySpotlights(members);
            displayDate(members);
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

        const memberImage = document.createElement("img");
        memberImage.src = `scripts/${member.image}`;
        memberImage.alt = `${member.name} logo`;

        const memberName = document.createElement("h3");
        memberName.textContent = member.name;

        const memberAddress = document.createElement("p");
        memberAddress.textContent = member.address;

        const memberPhone = document.createElement("p");
        memberPhone.textContent = member.phone;

        const memberWebsite = document.createElement("a");
        memberWebsite.href = member.website;
        memberWebsite.target = "_blank";
        memberWebsite.rel = "noopener noreferrer";
        memberWebsite.textContent = "Visit Website";

        card.appendChild(memberImage);
        card.appendChild(memberName);
        card.appendChild(memberAddress);
        card.appendChild(memberPhone);
        card.appendChild(memberWebsite);

        return card;
    }

    function displayDate(members) {
        if (!dateDisplay) return;
        const latestMember = members[members.length - 1];
        const currentDate = new Date().toLocaleDateString();
        dateDisplay.textContent = `Latest update: ${currentDate}`;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    fetchMembers();
});
