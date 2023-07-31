import { FILTER } from './constants.js';

const PICTURES_COUNT = 10;
const filterElement = document.querySelector('.img-filters');
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = (currentFilter) => {
  switch (currentFilter) {
    case FILTER.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case FILTER.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    const clickedButton = evt.target;

    if (!clickedButton.classList.contains('img-filters__button') || clickedButton.classList.contains('img-filters__button--active')) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    callback(getFilteredPictures(clickedButton.id));
  });
};

const init = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = loadedPictures;
  setOnFilterClick(callback);
};

export { init, getFilteredPictures };
