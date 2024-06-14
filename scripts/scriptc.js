document.addEventListener('DOMContentLoaded', () => {
  const compareForm = document.getElementById('compareForm');
  compareForm.addEventListener('submit', handleCompare);
});

function handleCompare(event) {
  event.preventDefault();
  const firstCountryInput = document.getElementById('firstCountryInput').value.trim().toLowerCase();
  const secondCountryInput = document.getElementById('secondCountryInput').value.trim().toLowerCase();

  if (!validateCountryName(firstCountryInput) || !validateCountryName(secondCountryInput)) {
    alert('Please enter valid country names (letters and spaces only).');
    return;
  }

  const fetchFirstCountry = fetchCountryData(firstCountryInput);
  const fetchSecondCountry = fetchCountryData(secondCountryInput);

  Promise.all([fetchFirstCountry, fetchSecondCountry])
    .then(([firstCountryData, secondCountryData]) => {
      if (firstCountryData.length === 0 || secondCountryData.length === 0) {
        throw new Error('One or both countries not found');
      }
      displayComparison(firstCountryData[0], secondCountryData[0]);
    })
    .catch(error => {
      console.error('Error comparing countries:', error);
      alert(`An error occurred: ${error.message}`);
    });
}

function validateCountryName(name) {
  // Validation : only letters and spaces
  return /^[a-zA-Z\s]+$/.test(name);
}

function fetchCountryData(countryName) {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .catch(error => {
      console.error(`Error fetching country data for ${countryName}:`, error);
      return []; // return empty array if fetch fails
    });
}

function displayComparison(firstCountry, secondCountry) {
  const firstCountryDetails = document.getElementById('firstCountryDetails');
  const secondCountryDetails = document.getElementById('secondCountryDetails');

  if (firstCountry.name.common.toLowerCase() === 'israel') {
    firstCountryDetails.innerHTML = `
      <img src="https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/437881540_825220496318340_756318295768297052_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5VMqMnP1hD8Q7kNvgFE66XV&_nc_ht=scontent.ftun10-1.fna&oh=00_AYBGoHXbT39DK7QDNdmd4clw_Frdf2-tZaefwE04yQvN2Q&oe=66710A62" alt="Hrissa" class="flag-image">
      <h3>FREE PALESTINE</h3>
      <p>Population: 0 </p>
      <p>Region: HEAL</p>
      <p>Capital: TOILET</p>
    `;
  } else {
    firstCountryDetails.innerHTML = `
      <img src="${firstCountry.flags.png}" alt="Flag of ${firstCountry.name.common}" class="flag-image">
      <h3>${firstCountry.name.common}</h3>
      <p>Population: ${firstCountry.population}</p>
      <p>Region: ${firstCountry.region}</p>
      <p>Capital: ${firstCountry.capital ? firstCountry.capital[0] : 'N/A'}</p>
    `;
  }
  if (secondCountry.name.common.toLowerCase() === 'israel') {
    secondCountryDetails.innerHTML = `
      <img src="https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/437881540_825220496318340_756318295768297052_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5VMqMnP1hD8Q7kNvgFE66XV&_nc_ht=scontent.ftun10-1.fna&oh=00_AYBGoHXbT39DK7QDNdmd4clw_Frdf2-tZaefwE04yQvN2Q&oe=66710A62" alt="Hrissa" class="flag-image">
      <h3>FREE PALESTINE</h3>
      <p>Population: 0</p>
      <p>Region: HEAL</p>
      <p>Capital: TOILET</p>
    `;
  } else {
    secondCountryDetails.innerHTML = `
      <img src="${secondCountry.flags.png}" alt="Flag of ${secondCountry.name.common}" class="flag-image">
      <h3>${secondCountry.name.common}</h3>
      <p>Population: ${secondCountry.population}</p>
      <p>Region: ${secondCountry.region}</p>
      <p>Capital: ${secondCountry.capital ? secondCountry.capital[0] : 'N/A'}</p>
    `;
  }
}
