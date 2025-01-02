import { initPristine, validateForm, resetValidation, uploadForm, hashtagsInput, descriptionInput, fileInput } from './pristine.js';
import { isEscapeKey, isEnterKey } from './util.js';


const overlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
// const submitButton = uploadForm.querySelector('#upload-submit');

hashtagsInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


const onFileInputChange = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function onCloseButtonClick() {
  resetValidation();
  uploadForm.reset();
  fileInput.value = '';

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', onCloseButtonClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
  fileInput.removeEventListener('change', onFileInputChange);
  document.removeEventListener('keydown', onEscKeydown);
  hashtagsInput.removeEventListener('keydown', onEnterKeydown);
  descriptionInput.removeEventListener('keydown', onEnterKeydown);
}

function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
}

function onEnterKeydown (evt) {
  if (isEnterKey(evt)) {
    evt.preventDefault();
  }
}

function onFormSubmit(evt) {
  if (!validateForm()) {
    evt.preventDefault();
  }
}

function initUploadForm() {
  fileInput.addEventListener('change', onFileInputChange);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);

  initPristine();

  hashtagsInput.addEventListener('keydown', onEnterKeydown);
  descriptionInput.addEventListener('keydown', onEnterKeydown);
  uploadForm.addEventListener('submit', onFormSubmit);
}

initUploadForm();


