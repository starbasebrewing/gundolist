// Function to fetch and parse Excel data
async function fetchCompaniesData() {
    try {
        const response = await fetch('data/companies.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        return jsonData.map(company => ({
            name: company.Company,
            logo: `src/assets/images/${company['Photo URL']}`,
            url: company.URL,
            focus: company.Focus,
            location: company.Location,
            xLink: company['X Link'],
            jobsPage: company['Jobs Page'],
            ceo: company.CEO,
            ceoX: company['CEO X']
        }));
    } catch (error) {
        console.error('Error loading companies data:', error);
        return [];
    }
}

function getSortedLocations(companies) {
    const locations = [...new Set(companies.map(company => company.location))];
    
    return locations.sort((a, b) => {
        // El Segundo always first
        if (a === 'El Segundo') return -1;
        if (b === 'El Segundo') return 1;
        
        // Check if locations are in California
        const aIsCA = a.endsWith(', CA');
        const bIsCA = b.endsWith(', CA');
        
        if (aIsCA && !bIsCA) return -1;
        if (!aIsCA && bIsCA) return 1;
        
        // If both are in CA, sort alphabetically
        if (aIsCA && bIsCA) {
            return a.localeCompare(b);
        }
        
        // Austin, TX comes next
        if (a === 'Austin, TX') return -1;
        if (b === 'Austin, TX') return 1;
        
        // All other locations sorted alphabetically
        return a.localeCompare(b);
    });
}

function populateLocationFilter(locations) {
    const filter = document.getElementById('locationFilter');
    filter.innerHTML = `
        <option value="all">All Locations</option>
        ${locations.map(location => `<option value="${location}">${location}</option>`).join('')}
    `;
}

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
            <div class="logo-container">
                <img src="${company.logo}" alt="${company.name} logo" class="company-logo">
            </div>
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

function filterCompanies(location, companies) {
    const filtered = location === 'all' 
        ? companies 
        : companies.filter(company => company.location === location);
    renderCompanies(shuffleArray([...filtered]));
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const companies = await fetchCompaniesData();
    const locations = getSortedLocations(companies);
    populateLocationFilter(locations);
    renderCompanies(shuffleArray([...companies]));
    
    document.getElementById('locationFilter').addEventListener('change', (e) => {
        filterCompanies(e.target.value, companies);
    });
});
