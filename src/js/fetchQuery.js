
function fetchCountries(searchQuery) {
 const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
 return fetch(url)
   .then(response => {
    if (response.status !== 200) {
     return 404;
    }
    return response.json()
   })
}
export default fetchCountries;
