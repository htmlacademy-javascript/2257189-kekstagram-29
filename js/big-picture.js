import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5; //сколько отображается комментариев на странице

const bigPicture = document.querySelector('.big-picture'); //все всплывающее окно
const closeButton = bigPicture.querySelector('.big-picture__cancel'); //кнопка закрытия
const commentsList = bigPicture.querySelector('.social__comments'); //список комментариев
const commentTemplate = commentsList.querySelector('.social__comment'); // один комментарий
const commentCountElement = bigPicture.querySelector('.social__comment-count'); //общее количество комментариев
const commentsLoaderElement = bigPicture.querySelector('.comments-loader'); //кнопка загрузить еще

let commentsShow = 0; //сколько изначально долно отображаться комментариев
let comments = []; //массив из комментариев

const createComment = ({avatar, message, name}) => { //создаем один коммент
  const comment = commentTemplate.cloneNode(true); //это шаблон
  comment.querySelector('.social__text').textContent = message; //текс комментария
  const socialPicture = comment.querySelector('.social__picture'); //ищем аватар
  socialPicture.src = avatar; //присваивает ссылку на значек аватара
  socialPicture.alt = name; //присваиваем имя
  return comment; //функция возвращает один коммент
};

const fillCommentCounter = () => {
  commentCountElement.innerHTML = `${commentsShow} из <span class="comments-count">${comments.length}</span> комментариев`; //строчка по отображению количества показанных на данный момент комментариев из общего количества
};

const setButtonState = () => { //функция сравнения показанных комментариев с общем количеством
  if (commentsShow >= comments.length) { //если показанных комментариев >= обшему количеству
    commentsLoaderElement.classList.add('hidden'); // кнопке "показать еще" вешаем hidden, что бы он не отображался
    return;
  }
  commentsLoaderElement.classList.remove('hidden'); //в противном случае удаляем класс
};


const renderComments = () => { //функция отображения комментариев
  const commentsListFragment = document.createDocumentFragment(); //формируем фрагмент
  const newComments = comments.slice(commentsShow, commentsShow + COMMENTS_PER_PORTION); //генерируем массив с комментариями от точки отсчета +5
  commentsShow = Math.min(commentsShow + COMMENTS_PER_PORTION, comments.length); //возвращает минимальное значение между уже показанными комментариями + 5 и общем количеством комментов
  newComments.forEach((comment) => commentsListFragment.append(createComment(comment))); // для каждого элемента массива создает комментарий с текстом, аватаркой и именем
  commentsList.append(commentsListFragment);//добавляем новый массив с комментариями в конец списка
  fillCommentCounter(); //показывает сколько отображено комментариев из общего количества
  setButtonState(); //сравниваем кол. отображенных коммент. с общим числом
};

const fillBigPicture = ({ url, description, likes }) => { //функция заполнения большой картинка
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url; // ссылка на большую картинку
  bigPicture.querySelector('.likes-count').textContent = likes; //присваиваем количество лайков
  bigPicture.querySelector('.social__caption').textContent = description; //присваиваем описание
  commentsList.innerHTML = ''; //очищаем комментарии, что бы с нуля сгенерить список
  renderComments(); //вызываем функцию по отрисовке комментариев
};

const onKeyDown = (evt) => { // функция закрытия по esc
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCommentsLoaderClick = (evt) => {
  evt.preventDefault();
  renderComments();
};

function openBigPicture () { //функция открытия большой фотки
  bigPicture.classList.remove('hidden'); //убираем Hidden
  document.body.classList.add('modal-open'); // вешаем класс открытого окна
  document.addEventListener('keydown', onKeyDown); // вешаем обработчик закрытия по esc
  closeButton.addEventListener('click', closeBigPicture); // вешаем обработчик по закрытию окна
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick); //вешаем обработчик на загрузить еще
}

function closeBigPicture() { //функция закрытия большой фотки
  bigPicture.classList.add('hidden'); // добавляем класс hidden
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick); //удаляем обработчик событий, т.к. окно закрываем и он будет есть ресурсы
  document.body.classList.remove('modal-open'); // удаляем все ранее навешанные классы и обработчики
  document.removeEventListener('keydown', onKeyDown);
  closeButton.removeEventListener('click', closeBigPicture);
}

const renderBigPicture = (data) => {
  comments = data.comments;
  fillBigPicture(data);
  openBigPicture();
};


export { renderBigPicture };
export { onKeyDown };
