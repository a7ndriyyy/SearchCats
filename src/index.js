import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { createMarkup, createMarkupCat } from './js/createMarkup';
import refs from './js/refs';

refs.selectEl.addEventListener('change', onValue);
fetchBreeds()
  .then(arr => {
    load();

    return (refs.selectEl.innerHTML = createMarkup(arr.data));
  })
  .then(() => slim())
  .catch(fetchError);

  function onValue(evt) {
    const id = evt.target.value;
    fetchCatByBreed(id)
      .then(obj => {
        load();
  
        return (refs.catInfoEl.innerHTML = createMarkupCat(obj.data));
      })
      .then(() => success())
      .catch(fetchError);
  }
  function fetchError() {
    Report.failure(refs.error.textContent, '');
  }
  function success() {
    Notify.success('Search was successful!)', '');
  }
  function load() {
    refs.selectEl.hidden = false;
    refs.loaderEl.classList.remove('loader');
  }
  
  function slim() {
    new SlimSelect({
      select: refs.selectEl,
    });
  }