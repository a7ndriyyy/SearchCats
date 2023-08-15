function createMarkup(arr) {
    return arr
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
  }
  function createMarkupCat({
    0: {
      breeds: {
        0: { temperament, name, description },
      },
      url,
    },
  }) {
    return `
    <img src="${url}" alt="${name}" width="800" height="500" />
    <div>
    <h1 class="title">${name}</h1>
    <p class="description">${description}</p>
    <h2>Temperament:</h2>
    <p class="description">${temperament}</p></div>`;
  }
  
  export { createMarkup, createMarkupCat };