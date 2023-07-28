const successMessage = document.querySelector('#success .success');
const errorMessage = document.querySelector('#error .error');

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.removeEventListener('click', onBodyClick);
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('error__inner')) {
    return;
  }
  hideMessage();
}

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  document.body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.body.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
