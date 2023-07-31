import { isEscapeKey } from './util.js';

const success = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const error = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

const hideModalMessage = () => {
  success.classList.add('hidden');
  error.classList.add('hidden');
  successButton.removeEventListener('click', closeModalWithButton);
  errorButton.removeEventListener('click', closeModalWithButton);
  removeDocumentListeners();
};

function closeModalWithEsc(evt) {
  if (isEscapeKey(evt)) {
    hideModalMessage();
  }
}

function closeModalWithButton() {
  hideModalMessage();
}

function closeModalWithBody(evt) {
  evt.stopPropagation();
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    hideModalMessage();
  }
}

function setDocumentListeners() {
  document.addEventListener('keydown', closeModalWithEsc);
  document.addEventListener('click', closeModalWithBody);
}

function removeDocumentListeners() {
  document.removeEventListener('keydown', closeModalWithEsc);
  document.removeEventListener('click', closeModalWithBody);
}

const showSuccess = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(success);
    } else {
      const successClone = document.querySelector('.success');
      successClone.classList.remove('hidden');
    }
    successButton.addEventListener('click', closeModalWithButton);
    setDocumentListeners();
  };
};

const showSuccessMessage = showSuccess();

const showError = () => {
  let flag = false;
  return () => {
    if (!flag) {
      flag = true;
      document.body.append(error);
    } else {
      const errorClone = document.querySelector('.error');
      errorClone.classList.remove('hidden');
    }
    errorButton.addEventListener('click', closeModalWithButton);
    setDocumentListeners();
  };
};
const showErrorMessage = showError();

export { showErrorMessage, showSuccessMessage };
