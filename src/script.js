const companies = [
    {
        name: "Rocket Lab",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Rocket_Lab_logo.svg/1200px-Rocket_Lab_logo.svg.png",
        url: "https://www.rocketlabusa.com",
        focus: "Space Launch",
        location: "El Segundo",
        xLink: "https://twitter.com/RocketLab",
        jobsPage: "https://www.rocketlabusa.com/careers",
        ceo: "Peter Beck",
        ceoX: "https://twitter.com/Peter_J_Beck"
    },
    {
        name: "Relativity Space",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Relativity_Space_logo.svg/1200px-Relativity_Space_logo.svg.png",
        url: "https://www.relativityspace.com",
        focus: "3D Printed Rockets",
        location: "Los Angeles",
        xLink: "https://twitter.com/relativityspace",
        jobsPage: "https://www.relativityspace.com/careers",
        ceo: "Tim Ellis",
        ceoX: "https://twitter.com/thetimellis"
    },
    {
        name: "Astroscale",
        logo: "https://astroscale.com/wp-content/uploads/2021/03/astroscale-logo-white.png",
        url: "https://astroscale.com",
        focus: "Space Debris Removal",
        location: "El Segundo",
        xLink: "https://twitter.com/Astroscale_HQ",
        jobsPage: "https://astroscale.com/careers/",
        ceo: "Nobu Okada",
        ceoX: "https://twitter.com/nobuokada"
    },
    {
        name: "Anduril",
        logo: "https://anduril.com/wp-content/uploads/2022/05/anduril-logo-white.svg",
        url: "https://anduril.com",
        focus: "Defense Technology",
        location: "Costa Mesa",
        xLink: "https://twitter.com/anduriltech",
        jobsPage: "https://anduril.com/careers/",
        ceo: "Brian Schimpf",
        ceoX: "https://twitter.com/brianschimpf"
    },
    {
        name: "Astra",
        logo: "https://astra.com/wp-content/uploads/2021/07/astra-logo-white.svg",
        url: "https://astra.com",
        focus: "Space Launch",
        location: "Alameda",
        xLink: "https://twitter.com/Astra",
        jobsPage: "https://astra.com/careers/",
        ceo: "Chris Kemp",
        ceoX: "https://twitter.com/kemp"
    }
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCompanyCard(company) {
    return `
        <div class="company-card">
            <img src="${company.logo}" alt="${company.name} logo" class="company-logo">
            <div class="company-info">
                <h3 class="company-name">${company.name}</h3>
                <p class="company-details">${company.focus} • ${company.location}</p>
                <div class="social-links">
                    <a href="${company.url}" target="_blank" title="Website"><i class="fas fa-globe"></i></a>
                    <a href="${company.xLink}" target="_blank" title="X"><i class="ri-twitter-x-fill"></i></a>
                    <a href="${company.jobsPage}" target="_blank" title="Careers"><i class="fas fa-briefcase"></i></a>
                </div>
            </div>
        </div>
    `;
}

function renderCompanies(companies) {
    const grid = document.getElementById('companiesGrid');
    grid.innerHTML = companies.map(company => createCompanyCard(company)).join('');
}

function filterCompanies(location) {
    const filtered = location === 'all' 
        ? companies 
        : companies.filter(company => company.location === location);
    renderCompanies(shuffleArray([...filtered]));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCompanies(shuffleArray([...companies]));
    
    document.getElementById('locationFilter').addEventListener('change', (e) => {
        filterCompanies(e.target.value);
    });
});
