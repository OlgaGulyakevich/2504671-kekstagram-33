import { validateHashtags } from './hashtags.js';
import { FILE_TYPES, FILE_TYPE_ERROR_MESSAGES } from './constants.js';

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
  addEventListeners();
}

function addValidationRules() {
  pristine.addValidator(
    hashtagsInput,
    (value) => validateHashtags(value).valid,
    (value) => validateHashtags(value).error
  );

  pristine.addValidator(
    fileInput,
    () => {
      const file = fileInput.files[0];
      if (!file) {
        return true;
      }
      const fileName = file.name.toLowerCase();
      return FILE_TYPES.some((ext) => fileName.endsWith(ext));
    },
    FILE_TYPE_ERROR_MESSAGES.VALID_TYPE
  );


  hashtagsInput.addEventListener('input', () => {
    pristine.validate(hashtagsInput);
  });

  descriptionInput.addEventListener('input', () => {
    pristine.validate(descriptionInput);
  });

}

function addEventListeners() {
  hashtagsInput.addEventListener('blur', () => {
    pristine.validate(hashtagsInput);
  });

  descriptionInput.addEventListener('blur', () => {
    pristine.validate(descriptionInput);
  });
}

function validateForm() {
  return pristine.validate();
}

function resetValidation() {
  pristine.reset();
}


export {initPristine, validateForm, resetValidation, uploadForm, hashtagsInput, descriptionInput, fileInput};
