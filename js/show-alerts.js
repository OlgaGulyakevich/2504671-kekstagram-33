import { isEscapeKey } from './util.js';
import {ALERT_SHOW_TIME} from './constants.js';


function showModal(templateSelector) {
  const template = document.querySelector(templateSelector).content.cloneNode(true);
  const container = template.querySelector('section');
  document.body.append(container);

  function closeModal() {
    container.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  function onEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  // Если клик вне блока .error__inner или .success__inner
  function onOutsideClick(evt) {
    if (!evt.target.closest('.error__inner') && !evt.target.closest('.success__inner')) {
      closeModal();
    }
  }

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);

  // Если есть кнопка для закрытия в шаблоне
  const closeButton = container.querySelector('.error__button') || container.querySelector('.success__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
}

// Функция для показа ошибки при отправке формы
function showError() {
  showModal('#error');
}

// Функция для показа ошибки при выборе файла больше 5мб
function showFileSizeError() {
  showModal('#file-size-error');
}

// Функция для показа ошибки при выборе неверного формата файла
function showFileTypeError() {
  showModal('#file-type-error');
}

// Функция для показа ошибки при загрузке данных (getData)
function showDataError() {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  const container = template.querySelector('.data-error');
  document.body.append(container);

  // Через 5 секунд убираем
  setTimeout(() => {
    container.remove();
  }, ALERT_SHOW_TIME);
}

// Функция для показа успеха отправки формы
function showSuccess() {
  showModal('#success');
}

export { showError, showFileSizeError, showFileTypeError, showDataError, showSuccess };
