import { isEscapeKey } from './util.js';
import { SubmitButtonText, FILE_TYPES, MAX_FILE_SIZE } from './constants.js';
import { sendData } from './api.js';
import { showError, showSuccess } from './show-alerts.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { showFileSizeError, showFileTypeError } from './show-alerts.js';
import {
  initPristine,
  validateForm,
  resetFormValidation,
  uploadForm,
  hashtagsInput,
  descriptionInput,
  fileInput
} from './form-upload-validation.js';

const overlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
const submitButton = uploadForm.querySelector('#upload-submit');
const previewImg = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

// Проверяем, не находится ли фокус в полях ввода
function isInputFocused() {
  return document.activeElement === hashtagsInput ||
         document.activeElement === descriptionInput;
}

function onDataInputsKeydown(evt) {
  if (isEscapeKey(evt) && isInputFocused()) {
    evt.stopPropagation();
  }
}

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
}

function removeEventListeners() {
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscKeydown);
  hashtagsInput.removeEventListener('keydown', onDataInputsKeydown);
  descriptionInput.removeEventListener('keydown', onDataInputsKeydown);
  uploadForm.removeEventListener('submit', onFormSubmit);
}

function closeForm() {
  resetFormValidation();
  uploadForm.reset();
  fileInput.value = '';

  resetScale();
  resetEffects();

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  removeEventListeners();
}

function addEventListeners() {
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
  hashtagsInput.addEventListener('keydown', onDataInputsKeydown);
  descriptionInput.addEventListener('keydown', onDataInputsKeydown);
  uploadForm.addEventListener('submit', onFormSubmit);
}

function onFileInputChange() {
  previewImg.src = '';

  const file = fileInput.files?.[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const isValidType = FILE_TYPES.some((ext) => fileName.endsWith(ext));
  if (!isValidType) {
    showFileTypeError();
    fileInput.value = '';
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    showFileSizeError();
    fileInput.value = '';
    return;
  }

  const imageURL = URL.createObjectURL(file);
  previewImg.src = imageURL;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageURL})`;
  });

  window.addEventListener('load', () => {
    URL.revokeObjectURL(imageURL);
  }, { once: true });

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initScale();
  initEffects();
  initPristine();
  addEventListeners();
}

function onCloseButtonClick() {
  closeForm();
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt) && !isInputFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

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
    closeForm();
    showSuccess();
  } catch (err) {
    showError();
  } finally {
    unblockSubmitButton();
  }
}

function setUploadForm() {
  fileInput.addEventListener('change', onFileInputChange);
}

export { setUploadForm };
