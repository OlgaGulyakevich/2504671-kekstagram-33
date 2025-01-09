import { initPristine, validateForm, resetValidation, uploadForm, hashtagsInput, descriptionInput, fileInput } from './form-upload-validation.js';
import { sendData } from './api.js';
import { isEscapeKey, isEnterKey } from './util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { showError, showSuccess } from './show-alert.js';

import { SubmitButtonText } from './constants.js';

const overlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
const submitButton = uploadForm.querySelector('#upload-submit');

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

// Функция закрытия формы и сброса
function closeForm() {
  resetValidation();
  uploadForm.reset();
  fileInput.value = '';

  resetScale();
  resetEffects();

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
}


function onCloseButtonClick() {
  closeForm();
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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING; // «ПУБЛИКУЮ...»
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE; // «ОПУБЛИКОВАТЬ»
};


// Асинхронная отправка формы
async function onFormSubmit(evt) {
  evt.preventDefault();

  const isValid = validateForm();
  if (!isValid) {
    return;
  }

  blockSubmitButton();
  const formData = new FormData(evt.target);

  try {
    await sendData(formData);
    showSuccess();
    closeForm();

  } catch (err) {
    showError();

  } finally {
    unblockSubmitButton();
  }
}

function initUploadForm() {
  fileInput.addEventListener('change', onFileInputChange);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);

  initPristine(); // Подключаем валидацию Pristine

  dataInputs.forEach((input) => {
    input.addEventListener('keydown', onDataInputsKeydown);
  });

  uploadForm.addEventListener('submit', onFormSubmit);
}

initUploadForm();
