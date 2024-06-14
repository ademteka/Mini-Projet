document.addEventListener('DOMContentLoaded', () => {
    const countryInput = document.getElementById('countryInput');
    countryInput.addEventListener('input', handleInputChange);

    const switchContainer = document.getElementById('switch-container');
    switchContainer.addEventListener('click', toggleDarkMode);

    const generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', generateRandomFlag);
});

function handleInputChange() {
    const countryName = countryInput.value.trim();
    if (!validateCountryName(countryName)) {
        // Optionally handle invalid input (if needed)
        return;
    }
    fetchCountryImage(countryName.toLowerCase());
}

function fetchCountryImage(countryName) {
    if (countryName === '') {
        // Optionally handle empty input scenario
        return;
    }

    // Clear any existing flags before displaying new ones
    clearFlags();

    switch (countryName.toLowerCase()) {
        case 'is':
        case 'isr':
        case 'isra':
        case 'israe':
        case 'israel':
            displayImages(['https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/437881540_825220496318340_756318295768297052_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5VMqMnP1hD8Q7kNvgFE66XV&_nc_ht=scontent.ftun10-1.fna&oh=00_AYBGoHXbT39DK7QDNdmd4clw_Frdf2-tZaefwE04yQvN2Q&oe=66710A62']);
            displayCustomCountryDetails({
                name: 'Free Palestine',
                population: '0',
                region: 'heal',
                capital: 'Toilet'
            });
            break;
        default:
            fetch(`https://restcountries.com/v3.1/name/${countryName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.length === 0) {
                        throw new Error('Country not found');
                    }
                    const flagUrl = data[0].flags.png; // Only take the first country's flag
                    displayImages([flagUrl]);
                    displayCountryDetails(data[0]);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert(`An error occurred: ${error.message}`);
                });
            break;
    }
}

function clearFlags() {
    const flagContainer = document.getElementById('flagContainer');
    const randomFlagContainer = document.getElementById('randomFlagContainer');
    flagContainer.innerHTML = '';
    randomFlagContainer.innerHTML = '';
}

function displayImages(imageUrls) {
    const flagContainer = document.getElementById('flagContainer');
    flagContainer.innerHTML = '';
    imageUrls.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = 'Country Flag';
        imgElement.className = 'flag-image';
        flagContainer.appendChild(imgElement);
    });
}

function displayCountryDetails(countryData) {
    const countryDetails = document.getElementById('countryDetails');
    countryDetails.innerHTML = `
        <h3>${countryData.name.common}</h3>
        <p>Population: ${countryData.population}</p>
        <p>Region: ${countryData.region}</p>
        <p>Capital: ${countryData.capital ? countryData.capital[0] : 'N/A'}</p>
    `;
}

function displayCustomCountryDetails(countryData) {
    const countryDetails = document.getElementById('countryDetails');
    countryDetails.innerHTML = `
        <h3>${countryData.name}</h3>
        <p>Population: ${countryData.population}</p>
        <p>Region: ${countryData.region}</p>
        <p>Capital: ${countryData.capital}</p>
    `;
}

function validateCountryName(countryName) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(countryName);
}

function generateRandomFlag() {
    clearFlags();

    fetch('https://restcountries.com/v3.1/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const randomCountry = data[Math.floor(Math.random() * data.length)];
            const randomFlagUrl = randomCountry.flags.png;
            displayRandomFlag(randomFlagUrl, randomCountry.name.common);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert(`An error occurred: ${error.message}`);
        });
}

function displayRandomFlag(flagUrl, countryName) {
    const randomFlagContainer = document.getElementById('randomFlagContainer');
    randomFlagContainer.innerHTML = '';
    const imgElement = document.createElement('img');
    imgElement.src = flagUrl;
    imgElement.alt = 'Random Flag';
    imgElement.className = 'flag-image';
    randomFlagContainer.appendChild(imgElement);

    if (countryName.toLowerCase() === 'israel') {
        imgElement.src = 'https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/437881540_825220496318340_756318295768297052_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5VMqMnP1hD8Q7kNvgFE66XV&_nc_ht=scontent.ftun10-1.fna&oh=00_AYBGoHXbT39DK7QDNdmd4clw_Frdf2-tZaefwE04yQvN2Q&oe=66710A62'; 
        imgElement.alt = 'Hrissa';
        imgElement.className = 'flag-image hrissa';
    }
    if (countryName.toLowerCase() === 'israel') {
        displayCustomCountryDetails({
            name: 'Free Palestine',
            population: '0',
            region: 'Heal',
            capital: 'Toilet'
        });
    } else {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    throw new Error('Country not found');
                }
                displayCountryDetails(data[0]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert(`An error occurred: ${error.message}`);
            });
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
