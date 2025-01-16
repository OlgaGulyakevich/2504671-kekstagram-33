import { validateHashtags } from './hashtags.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const fileInput = uploadForm.querySelector('#upload-file');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};


// Инициализация Pristine.js и валидации формы
let pristine;

function initPristine() {
  pristine = new Pristine (uploadForm, pristineConfig, false);
  addValidationRules();
}

function addValidationRules() {

  // Валидация хэштегов
  pristine.addValidator(
    hashtagsInput,
    (value) => validateHashtags(value).valid,
    (value) => validateHashtags(value).error
  );

  // Общая валидации при вводе или потере фокуса
  const attachValidation = (input) => {
    input.addEventListener('input', () => pristine.validate(input));
    input.addEventListener('blur', () => pristine.validate(input));
  };
  [hashtagsInput, descriptionInput].forEach(attachValidation);
}


function validateForm() {
  return pristine.validate();
}

function resetFormValidation() {
  pristine.reset();
}


export { initPristine, validateForm, resetFormValidation, uploadForm, hashtagsInput, descriptionInput, fileInput};
