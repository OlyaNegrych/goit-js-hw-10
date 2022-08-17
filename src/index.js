import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import FetchCountries from './js/fetchCountries';

// const fetchCountries = new FetchCountries();

// Notiflix.Notify.success/failure/warning/info('Sol lucet omnibus');

const DEBOUNCE_DELAY = 300;
const url =
  'https://restcountries.com/v3.1/name/peru?fields=name.official,capital,population,flags.svg,languages';

const inputRef = document.querySelector('#search-box');
const countriesListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearchCounty, DEBOUNCE_DELAY));

function onSearchCounty(evt) {
  fetchCountries(evt.target.value);
  console.log(evt.target.value);

  //  const filter = evt.target.value.toLowerCase();
  //  const filteredCountries = countries.filter(country =>
  //    country.name.toLowerCase().includes(filter)
  //  );
  //  const listItemsmarkup = createListMarkup(filteredCountries);
  //  insertMarkup(listItemsmarkup);
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      insertCountryMarkup(country);
    })
    .catch(error => console.log(error));
}

function createCountryDescriptionMarkup(country) {
  return `<img class="flag" src="${country[0].flags.svg}" alt="${country[0].name.official}flag">
<h1 class="country">${country[0].name.official}</h1>
<p><b>Capital:</b> ${country[0].capital[0]}</p>
<p><b>Population:</b> ${country[0].population}</p>
<p><b>Languages:</b> ${country[0].languages}</p>`;
}

function createCountriesListMarkup(countries) {
  return countries
    .map(
      country => `<li>
  <img class="small-flag" src="${country[0].flags.svg}" alt="${country[0].name.official}flag">
  <span>${country[0].name.official}</span>
</li>`
    )
    .join('');
}

function insertListMarkup(countries) {
  const markup = createCountriesListMarkup(countries);
  countriesListRef.innerHTML = markup;
}

function insertCountryMarkup(country) {
  const markup = createCountryDescriptionMarkup(country);
  countryInfoRef.innerHTML = markup;
}
