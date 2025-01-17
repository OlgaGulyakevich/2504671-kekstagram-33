import {Filters, RANDOM_PHOTO_MAX} from './constants.js';
import {shuffleArray, debounce} from './util.js';

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');
const filtersButtons = filtersForm.querySelectorAll('.img-filters__button');

function getFilteredPhotos(photos, filterType) {
  switch (filterType) {

    case Filters.DEFAULT:
      return [...photos];

    case Filters.RANDOM:
    {
      const shuffled = shuffleArray([...photos]);
      return shuffled.slice(0, RANDOM_PHOTO_MAX);
    }

    case Filters.DISCUSSED:
      return [...photos].sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);

    default:
      return [...photos];
  }
}

function initFilters(photos, cb) {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', debounce((evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    filtersButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');

    // Получаем ID, он же тип фильтра
    const filterType = evt.target.id;

    // Получаем отсортированный массив
    const filtered = getFilteredPhotos(photos, filterType);

    // Передаём в колбэк, который отрисовывает миниатюры
    cb(filtered);
  }));
}

export {initFilters};
