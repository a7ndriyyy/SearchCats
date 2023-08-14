import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
// import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import refs from './js/refs';

refs.selectEl.addEventListener('change', onValueId);
fetchBreeds()
  .then(arr => {
    load();

    return (refs.selectEl.innerHTML = createMarkup(arr.data));
  })
  .then(() => slim())
  .catch(fetchError);