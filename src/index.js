import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countriesListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onSearchCounty, DEBOUNCE_DELAY));

function onSearchCounty(evt) {
  clearCoutryList();
  fetchCountries(evt.target.value.trim())
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countries.length > 1 && countries.length < 10) {
        clearCoutryList();
        insertListMarkup(countries);
      }
      if (countries.length === 1) {
        clearCoutryList();
        insertCountryMarkup(countries);
      }
      if (countries.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
      }
    })
    .catch(error => console.log(error));
}

function createCountryDescriptionMarkup(country) {
  const languagesList = Object.values(country[0].languages);
  return `<img class="flag" src="${country[0].flags.svg}" alt="${country[0].name.official}flag">
<h1 class="country">${country[0].name.official}</h1>
<p><b>Capital:</b> ${country[0].capital[0]}</p>
<p><b>Population:</b> ${country[0].population}</p>
<p><b>Languages:</b> ${languagesList.join(', ')}</p>`;
}

function createCountriesListMarkup(countries) {
  return countries
    .map(
      country => `<li>
  <img class="small-flag" src="${country.flags.svg}" alt="${country.name.official}flag">
  <span>${country.name.official}</span>
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

function clearCoutryList() {
  countriesListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}