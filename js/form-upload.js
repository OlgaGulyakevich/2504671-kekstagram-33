import { isEscapeKey } from './util.js';
import { SubmitButtonText, FILE_TYPES, MAX_FILE_SIZE } from './constants.js';
import { sendData } from './api.js';
import { showError, showSuccess } from './show-alerts.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { showFileInputError, showFileTypeError } from './show-alerts.js';
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

// Блокируем Enter на хэштегах/описании
function onDataInputsKeydown(evt) {
  evt.stopPropagation();
}

// Блокировка/разблокировка кнопки при отправке
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

  // Удаляем обработчики событий
  uploadForm.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onEscKeydown);
  hashtagsInput.removeEventListener('keydown', onDataInputsKeydown);
  descriptionInput.removeEventListener('keydown', onDataInputsKeydown);
}

// Открытие формы
function openForm() {
  fileInput.addEventListener('change', onFileInputChange);
}

// Обработчик fileInput — рендерим выбранное изображение
function onFileInputChange() {
  initPristine();

  const file = fileInput.files?.[0];
  if (!file) {
    return;
  }
  // --- Проверка формата файла ---
  const fileName = file.name.toLowerCase();
  const isValidType = FILE_TYPES.some((ext) => fileName.endsWith(ext));
  if (!isValidType) {
    showFileTypeError();
    fileInput.value = '';
    return;
  }

  // --- Проверка размера ---
  if (file.size > MAX_FILE_SIZE) {
    showFileInputError();
    fileInput.value = '';
    return;
  }

  const imageURL = URL.createObjectURL(file);
  previewImg.src = imageURL;

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initScale();
  initEffects();
}


// Кнопка «Закрыть» или нажали Esc
function onCloseButtonClick() {
  closeForm();
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

  // Блокируем «Enter» внутри хэштегов и описания
  hashtagsInput.addEventListener('keydown', onDataInputsKeydown);
  descriptionInput.addEventListener('keydown', onDataInputsKeydown);

  uploadForm.addEventListener('submit', onFormSubmit);
}


export { setUploadForm };
