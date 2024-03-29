import { renderBigPicture } from './big-picture.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const newPhotoFragment = document.createDocumentFragment();

const clearContainer = () => {
  const prevPictures = photoContainer.querySelectorAll('.picture');
  prevPictures.forEach((picture) => picture.remove());
};

const renderPhoto = ({ url, description, likes, comments }) => {
  const newPhotoElement = photoTemplate.cloneNode(true);
  newPhotoElement.addEventListener('click', () => renderBigPicture({ url, description, likes, comments }));
  newPhotoElement.querySelector('.picture__img').src = url;
  newPhotoElement.querySelector('.picture__img').alt = description;
  newPhotoElement.querySelector('.picture__likes').textContent = likes;
  newPhotoElement.querySelector('.picture__comments').textContent = comments.length;
  newPhotoFragment.appendChild(newPhotoElement);
};

const renderPhotos = (data) => {
  clearContainer();
  data.forEach(renderPhoto);
  photoContainer.append(newPhotoFragment);
};

export { renderPhotos };
