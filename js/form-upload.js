import {
  validateForm,
  resetFormValidation,
  uploadForm,
  hashtagsInput,
  descriptionInput,
  fileInput
} from './form-upload-validation.js';

import { sendData } from './api.js';
import { showError, showSuccess } from './show-alerts.js';
import { isEscapeKey } from './util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { SubmitButtonText } from './constants.js';

// Элементы формы
const overlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
const submitButton = uploadForm.querySelector('#upload-submit');

// Блокируем Enter на хэштегах/описании
function onDataInputsKeydown(evt) {
  evt.stopPropagation();
}

// Блокируем кнопку при отправке
function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING; // «ПУБЛИКУЮ...»
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE; // «ОПУБЛИКОВАТЬ»
}

// Закрытие формы (возврат к исходному состоянию)
function closeForm() {
  resetFormValidation();
  uploadForm.reset();
  fileInput.value = '';

  resetScale();
  resetEffects();

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// Открытие формы
function openForm() {
  fileInput.addEventListener('change', () => {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    initScale();
    initEffects();
  });
}

// Кнопка «Закрыть» или нажали Esc
function onCloseButtonClick() {
  closeForm();

  uploadForm.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onEscKeydown);
  hashtagsInput.removeEventListener('keydown', onDataInputsKeydown);
  descriptionInput.removeEventListener('keydown', onDataInputsKeydown);
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
}

// Обработка отправки формы (submit)
async function onFormSubmit(evt) {
  evt.preventDefault();

  const isValid = validateForm();
  if (!isValid) {
    return;
  }

  blockSubmitButton();
  const formData = new FormData(uploadForm);

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

// Инициализация всей логики формы
function setUploadForm() {
  openForm();

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);

  hashtagsInput.addEventListener('keydown', onDataInputsKeydown);
  descriptionInput.addEventListener('keydown', onDataInputsKeydown);

  uploadForm.addEventListener('submit', onFormSubmit);
}


setUploadForm();
