import { isEscapeKey } from './util.js';
import { resetEffects } from './effects.js';
import { scaleReset } from './scale.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_COUNT_MAX = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const DESCRIPTION_MAX_LENGTH = 140;
const DESCRIPTION_ERROR_TEXT = 'Максимальная длина описания - 140 символов';

const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const imgUpload = form.querySelector('.img-upload__overlay');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const cancelButton = document.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const fileChooser = form.querySelector('.img-upload__input[type=file]');
const imageElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const closeModal = () => {
  document.body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
  form.reset();
  resetEffects();
  scaleReset();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  document.body.classList.add('modal-open');
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isInTextFieldset = () =>
  document.activeElement === hashtagsInput || document.activeElement === descriptionInput;

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isInTextFieldset()) {
    evt.preventDefault();
    closeModal();
  }
}

const isValidHashtag = (hashtag) => VALID_HASHTAG.test(hashtag);
const isValidCount = (hashtags) => hashtags.length <= HASHTAG_COUNT_MAX;
const areUniqueTags = (hashtags) => {
  const lowerCaseTags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateHashtags = (string) => {
  const hashtags = string.trim().split(' ').filter((hashtag) => hashtag.trim());
  return isValidCount(hashtags) && areUniqueTags(hashtags) && hashtags.every(isValidHashtag);
};


const getHashtagError = (string) => {
  const hashtags = string.trim().split(' ').filter((hashtag) => hashtag.trim());
  if (!isValidCount(hashtags)) {
    return 'Количество хэштегов превышает допустимое';
  } else if (!hashtags.every(isValidHashtag)) {
    return 'Хэштег написан с ошибкой';
  } else if (!areUniqueTags(hashtags)) {
    return 'Хэштеги повторяются';
  }
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  getHashtagError
);

const validateDescription = (string) => string.length <= DESCRIPTION_MAX_LENGTH;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  DESCRIPTION_ERROR_TEXT
);

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const setOnFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidated = pristine.validate([hashtagsInput, descriptionInput]);

    if (isValidated) {
      blockSubmitButton();
      sendData(new FormData(evt.target)).then(() => {
        showSuccessMessage();
        form.reset();
        closeModal();
      })
        .catch(showErrorMessage);

      unblockSubmitButton();
    } else {
      showErrorMessage();
    }
  });
};

fileChooser.addEventListener('change', () => {
  const selectedFile = fileChooser.files[0];
  const fileName = selectedFile.name.toLowerCase();

  const isValidFileType = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isValidFileType) {
    imageElement.src = URL.createObjectURL(selectedFile);
    effectsPreviewElement.forEach((previewElement) => (previewElement.style.backgroundImage = `url(${imageElement.src})`));
    openModal();
  }
});

fileChooser.addEventListener('change', openModal);
uploadFile.addEventListener('change', openModal);
cancelButton.addEventListener('click', closeModal);

setOnFormSubmit();

export { closeModal, setOnFormSubmit };
