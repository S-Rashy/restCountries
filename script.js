const display = document.querySelector(".display");
const modeToggle = document.querySelector("#modeToggle");
const wrapper = document.querySelector(".wrapper");
const searchCountry = document.querySelector("#searchCountry");
const filterRegion = document.querySelector("#filterRegion");
const backBtn = document.querySelector("#backBtn");

let isDarkMode = false;
let allCountries = [];
let filteredCountries = [];

async function loadAll() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    allCountries = data;
    filteredCountries = data;
    displayCountries(data);
    showMainControls();
  } catch (error) {
    console.error("Error loading data:", error);
    display.innerHTML =
      '<div class="error">Failed to load countries data.</div>';
  }
}

function displayCountries(countries) {
  if (!countries || countries.length === 0) {
    display.innerHTML = '<div class="error">No countries found.</div>';
    return;
  }

  let cards = "";
  countries.forEach((country, index) => {
    const population = country.population
      ? country.population.toLocaleString()
      : "N/A";
    const capital = country.capital
      ? Array.isArray(country.capital)
        ? country.capital[0]
        : country.capital
      : "N/A";
    const region = country.region || "N/A";
    const flagUrl =
      country.flags?.svg || country.flags?.png || country.flag || "";

    cards += `
                    <div class="countryCard" onclick="showCountryDetails(${allCountries.indexOf(
                      country
                    )})">
                        <img src="${flagUrl}" alt="${
      country.name?.common || country.name
    } flag"/>
                        <div class="content">
                            <h3>${country.name?.common || country.name}</h3>
                            <p>Population: <span>${population}</span></p>
                            <p>Region: <span>${region}</span></p>
                            <p>Capital: <span>${capital}</span></p>
                        </div>
                    </div>
                `;
  });
  display.innerHTML = cards;
}

function showCountryDetails(index) {
  const country = allCountries[index];
  if (!country) return;

  const population = country.population
    ? country.population.toLocaleString()
    : "N/A";
  const capital = country.capital
    ? Array.isArray(country.capital)
      ? country.capital.join(", ")
      : country.capital
    : "N/A";
  const region = country.region || "N/A";
  const subregion = country.subregion || "N/A";
  const tld = country.tld
    ? Array.isArray(country.tld)
      ? country.tld.join(", ")
      : country.tld
    : country.topLevelDomain
    ? Array.isArray(country.topLevelDomain)
      ? country.topLevelDomain.join(", ")
      : country.topLevelDomain
    : "N/A";
  const flagUrl =
    country.flags?.svg || country.flags?.png || country.flag || "";

  let currencies = "N/A";
  if (country.currencies) {
    if (Array.isArray(country.currencies)) {
      currencies = country.currencies
        .map((curr) => curr.name || curr.code || curr)
        .join(", ");
    } else if (typeof country.currencies === "object") {
      currencies = Object.values(country.currencies)
        .map((curr) => curr.name || curr)
        .join(", ");
    } else {
      currencies = country.currencies;
    }
  }

  let languages = "N/A";
  if (country.languages) {
    if (Array.isArray(country.languages)) {
      languages = country.languages.map((lang) => lang.name || lang).join(", ");
    } else if (
      typeof country.languages === "object" &&
      !Array.isArray(country.languages)
    ) {
      languages = Object.values(country.languages).join(", ");
    } else {
      languages = country.languages;
    }
  }
  let nativeName = country.name?.common || country.name || "N/A";
  if (country.name?.nativeName) {
    const nativeNames = Object.values(country.name.nativeName);
    if (nativeNames.length > 0 && nativeNames[0].common) {
      nativeName = nativeNames[0].common;
    }
  } else if (country.nativeName) {
    nativeName = country.nativeName;
  }

  let timezones = "N/A";
  if (country.timezones) {
    timezones = Array.isArray(country.timezones)
      ? country.timezones.join(", ")
      : country.timezones;
  }

  let borders = "N/A";
  if (
    country.borders &&
    Array.isArray(country.borders) &&
    country.borders.length > 0
  ) {
    const borderNames = country.borders.map((borderCode) => {
      const borderCountry = allCountries.find(
        (c) =>
          c.alpha3Code === borderCode ||
          c.cca3 === borderCode ||
          c.alpha2Code === borderCode ||
          c.cca2 === borderCode
      );
      return borderCountry
        ? borderCountry.name?.common || borderCountry.name
        : borderCode;
    });
    borders = borderNames.join(", ");
  }

  const details = `
                <div class="countryCardD">
                    <img src="${flagUrl}" alt="${
    country.name?.common || country.name
  } flag" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOHB4IiBmaWxsPSIjNjY2Ij5ObyBGbGFnPC90ZXh0Pjwvc3ZnPg=='"/>
                    <div class="details">
                        <h3>${country.name?.common || country.name}</h3>
                        <div class="details-grid">
                            <div class="details-column">
                                <h5>Native Name: <span>${nativeName}</span></h5>
                                <h5>Population: <span>${population}</span></h5>
                                <h5>Region: <span>${region}</span></h5>
                                <h5>Sub Region: <span>${subregion}</span></h5>
                                <h5>Capital: <span>${capital}</span></h5>
                            </div>
                            <div class="details-column">
                                <h5>Top Level Domain: <span>${tld}</span></h5>
                                <h5>Currencies: <span>${currencies}</span></h5>
                                <h5>Languages: <span>${languages}</span></h5>
                                <h5>Timezones: <span>${timezones}</span></h5>
                            </div>
                        </div>
                        <div class="borders-section">
                            <h5>Border Countries: <span>${borders}</span></h5>
                        </div>
                    </div>
                </div>
            `;

  display.innerHTML = details;
  hideMainControls();
}

function searchCountries() {
  const searchTerm = searchCountry.value.trim().toLowerCase();

  if (searchTerm.length === 0) {
    filteredCountries = allCountries;
    displayCountries(filteredCountries);
    return;
  }

  filteredCountries = allCountries.filter((country) => {
    const countryName = (
      country.name?.common ||
      country.name ||
      ""
    ).toLowerCase();
    return countryName.includes(searchTerm);
  });

  displayCountries(filteredCountries);
}

function filterByRegion() {
  const region = filterRegion.value.toLowerCase();

  if (!region || region === "all") {
    filteredCountries = allCountries;
    displayCountries(filteredCountries);
    return;
  }

  filteredCountries = allCountries.filter((country) => {
    const countryRegion = (country.region || "").toLowerCase();
    return countryRegion === region;
  });

  displayCountries(filteredCountries);
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark", isDarkMode);
  modeToggle.textContent = isDarkMode ? "🔆 Light Mode" : "🌙 Dark Mode";
}

function showMainControls() {
  searchCountry.style.display = "block";
  filterRegion.style.display = "block";
  backBtn.style.display = "none";
}

function hideMainControls() {
  searchCountry.style.display = "none";
  filterRegion.style.display = "none";
  backBtn.style.display = "block";
}

searchCountry.addEventListener("input", searchCountries);
filterRegion.addEventListener("change", filterByRegion);
modeToggle.addEventListener("click", toggleDarkMode);
backBtn.addEventListener("click", () => {
  filteredCountries = allCountries;
  displayCountries(filteredCountries);
  showMainControls();
  searchCountry.value = "";
  filterRegion.value = "";
});

loadAll();
