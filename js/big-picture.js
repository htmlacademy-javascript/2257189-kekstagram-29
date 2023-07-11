import { isEscapeKey } from './util.js';

// const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture'); //все всплывающее окно
const closeButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия
const commentsList = bigPicture.querySelector('.social__comments'); //список комментариев
const commentTemplate = commentsList.querySelector('.social__comment'); // один комментарий
// const commentCountElement = bigPicture.querySelector('.comments-count'); //общее количество комментариев
// const commentsLoaderElement = bigPicture.querySelector('.comments-loader'); //кнопка загрузить еще

// let commentsShow = 0;
// let comments = [];

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach(({avatar, message, name}) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentAvatar = commentElement.querySelector('.social__picture');
    const commentText = commentElement.querySelector('.social__text');
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentText.textContent = message;
    commentsListFragment.append(commentElement);
  });

  commentsList.append(commentsListFragment);
};

const renderBigPicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  renderComments(comments);
};

const onKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeyDown);
  closeButton.removeEventListener('click', closeBigPicture);
}

function openBigPicture (cardData) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderBigPicture(cardData);
  document.addEventListener('keydown', onKeyDown);
  closeButton.addEventListener('click', closeBigPicture);
}


export { openBigPicture };
