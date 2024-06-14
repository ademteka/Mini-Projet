document.addEventListener('DOMContentLoaded', () => {
    const switchContainer = document.getElementById('switch-container');
    switchContainer.addEventListener('click', toggleDarkMode);
});


let currentCountry = '';

function generateRandomFlagForGuess() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const randomCountry = data[Math.floor(Math.random() * data.length)];
            currentCountry = randomCountry.name.common;
            const flagUrl = randomCountry.flags.png;
            displayRandomFlagForGuess(flagUrl, currentCountry);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert(`An error occurred: ${error.message}`);
        });
}

function displayRandomFlagForGuess(flagUrl, countryName) {
    const flagContainer = document.getElementById('guessFlagContainer');
    flagContainer.innerHTML = '';
    const imgElement = document.createElement('img');
    imgElement.src = flagUrl;
    imgElement.alt = 'Random Flag';
    imgElement.className = 'flag-image';
    flagContainer.appendChild(imgElement);

    if (countryName.toLowerCase() === 'israel') {
        imgElement.src = 'https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/437881540_825220496318340_756318295768297052_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5VMqMnP1hD8Q7kNvgFE66XV&_nc_ht=scontent.ftun10-1.fna&oh=00_AYBGoHXbT39DK7QDNdmd4clw_Frdf2-tZaefwE04yQvN2Q&oe=66710A62'; 
        imgElement.alt = 'Free Palestine';
        imgElement.className = 'flag-image hrissa';
    }
}

function checkGuess() {
    const userGuess = document.getElementById('guessCountryInput').value.trim();
    const guessResult = document.getElementById('guessResult');
    if (userGuess.toLowerCase() === currentCountry.toLowerCase()) {
        guessResult.textContent = `Correct! The country is ${currentCountry}.`;
        guessResult.className = 'guess-result correct';
    } else {
        guessResult.textContent = `Incorrect. Try again!`;
        guessResult.className = 'guess-result incorrect';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
