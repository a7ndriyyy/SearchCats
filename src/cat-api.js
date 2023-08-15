import axios from 'axios';
axios.defaults.headers.common[`x-api-key`] = 
`live_gIIwgFyWslEu2Y6NSYnnI4PrvIv2DcwMVKksrVA3CLZ7CHFtp9ealtdYK2B7Qt0n`;
export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(response.status);
          }
          return response.json();
      });       
};

export function fetchCatByBreed(breedId) {
  return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(response.status);
          }
          return response.json();
      });  
};