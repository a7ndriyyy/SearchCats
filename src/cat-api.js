import axios from 'axios';
axios.defaults.headers.common[`x-api-key`] = 
`live_gIIwgFyWslEu2Y6NSYnnI4PrvIv2DcwMVKksrVA3CLZ7CHFtp9ealtdYK2B7Qt0n`;
const api_key = 'https://api.thecatapi.com/v1/breeds';
const url = `https://api.thecatapi.com/v1/images/search`;

function fetchBreeds() {
    return axios.get(api_key);
  }
  
  function fetchCatByBreed(breedId) {
    return axios.get(`${url}?breed_ids=${breedId}`);
  }
  export { fetchBreeds, fetchCatByBreed };