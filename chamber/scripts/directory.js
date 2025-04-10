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

        const memberImagePath = `images/${member.logo}`;
        const img = new Image();
        img.src = memberImagePath;
        img.alt = `${member.name} Logo`;
        img.loading = "lazy";
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.borderRadius = "50%";

        img.onload = function() {
            card.appendChild(img);
        };
        img.onerror = function() {
            const defaultImg = `images/default.png`; // Fallback image
            img.src = defaultImg;
        };

        card.innerHTML += `
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
    }

    function displayDate(members) {
        if (!dateDisplay) return;
        const latestMember = members.reduce((latest, current) => {
            const latestDate = latest.dateAdded ? new Date(latest.dateAdded) : new Date(0);
            const currentDate = current.dateAdded ? new Date(current.dateAdded) : new Date(0);
            return latestDate > currentDate ? latest : current;
        });

        const date = new Date(latestMember.dateAdded);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        
        dateDisplay.textContent = `Latest member added on: ${formattedDate}`;
    }

    fetchMembers();

    openLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const modalId = event.target.getAttribute('href').substring(1);
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    modals.forEach(modal => {
        const closeButton = modal.querySelector('button');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });
});
