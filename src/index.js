import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const ref = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, error } = ref;

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');


fetchBreeds()
.then(arr =>{
  console.log(arr);
  selector.innerHTML = createMarkup(arr);
  select();
})
// .catch(onFetchError);


let arrBreedsId = [];
fetchBreeds()
.then(arr => {
  arr.data.forEach(element => {
      arrBreedsId.push({text: element.name, value: element.id});
  });
  const optionsMarkup = arrBreedsId.map(({value, name}) => {
    return `<option value="${value}">${name}</option>`;
  }) 
  .join(``);
  selector.innerHTML = optionsMarkup;
  new SlimSelect({
      select: selector,
      arr: arrBreedsId,
  });
  })
.catch(onFetchError);

selector.addEventListener('change', onSelectBreed);
function onSelectBreed(event) {
  loader.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
  .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selector.classList.remove('is-hidden');
      const { url, breeds } = data[0];
      
      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
      divCatInfo.classList.remove('is-hidden');
  })
  .catch(onFetchError);
};

function onFetchError(error) {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px'
  });
};
 
function select() {
  new SlimSelect({
    select:selector,
  })
}

function createMarkup(arr){
  return arr.data
  .map(({id, name}) => {
    return `<option value="${id}">${name}</option>`;
  }) 
  .join(``);
}


