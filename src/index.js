import countryTemplate from "./template/country.hbs";
import countriesTemplate from "./template/countries.hbs";
import fetchCountries from "./js/fetchQuery";
import markupTemplate from "./js/markup";
import handleSpinner from "./js/spinner";
import notifier from './js/notify';
import refs from "./js/refs"
const debounce = require("lodash.debounce");
import './sass/styles.scss';

const debouncedInputQuery = debounce(event => {
  const query = event.target.value;
  if (query !== "") {
    handleSpinner.showSpinner();
    fetchCountries(query)
      .then(countries => {
        if (countries !== 404) {
          if (countries.length > 10) {
            refs.ul.innerHTML = "";
            notifier.warning("too many matches found, please enter a better query");
            handleSpinner.hideSpinner();
          }
          else if (countries.length === 1) {
            markupTemplate(countryTemplate, countries);
            handleSpinner.hideSpinner();
          }
          else {
            markupTemplate(countriesTemplate, countries);
            handleSpinner.hideSpinner();
          }
        }
        else {
          refs.ul.innerHTML = "";
          notifier.warning("Unknown country, please enter correct query");
          handleSpinner.hideSpinner();
        }
      });
  }
  else {
    refs.ul.innerHTML = "";
  }
}, 500);
refs.search.addEventListener("input", debouncedInputQuery);