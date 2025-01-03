import { initPristine, validateForm, resetValidation, uploadForm, hashtagsInput, descriptionInput, fileInput } from './pristine.js';
import { isEscapeKey, isEnterKey } from './util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';


const overlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
// const submitButton = uploadForm.querySelector('#upload-submit');

const dataInputs = [hashtagsInput, descriptionInput];

function onDataInputsKeydown(evt) {
  evt.stopPropagation();
  if (isEnterKey(evt)) {
    evt.preventDefault();
  }
}

function onFileInputChange () {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initScale();
  initEffects();
}

function onCloseButtonClick() {
  resetValidation();
  uploadForm.reset();
  fileInput.value = '';

  resetScale();
  resetEffects();

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadForm.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onEscKeydown);

  dataInputs.forEach((input) => {
    input.removeEventListener('keydown', onDataInputsKeydown);
  });
}


function onEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
}

function onFormSubmit (evt) {
  if (!validateForm()) {
    evt.preventDefault();
  }
}

function initUploadForm() {
  fileInput.addEventListener('change', onFileInputChange);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);

  initPristine();

  dataInputs.forEach((input) => {
    input.addEventListener('keydown', onDataInputsKeydown);
  });

  uploadForm.addEventListener('submit', onFormSubmit);
}

initUploadForm();
