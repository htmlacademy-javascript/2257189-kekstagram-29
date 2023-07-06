import { createPostArray } from './data.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newPhotos = createPostArray(25);
const newPhotoFragment = document.createDocumentFragment();

newPhotos.forEach(({url, description, likes, comments}) => {
  const newPhotoElement = photoTemplate.cloneNode(true);
  newPhotoElement.querySelector('.picture__img').src = url;
  newPhotoElement.querySelector('.picture__img').alt = description;
  newPhotoElement.querySelector('.picture__likes').textContent = likes;
  newPhotoElement.querySelector('.picture__comments').textContent = comments;
  newPhotoFragment.appendChild(newPhotoElement);
});

photoContainer.append(newPhotoFragment);
