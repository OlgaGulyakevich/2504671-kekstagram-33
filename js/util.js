import {DEBOUNCE_TIME} from './constants.js';

// Генерация уникального ID
const getIdGenerator = () => {
  let id = 0;
  return () => ++id;
};

// Генерация случайного числа в диапазоне
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Нажатие клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Нажатие клавиши Enter
const isEnterKey = (evt) => evt.key === 'Enter';

// Переключение классов
const toggleElementVisibility = (element, className = '') => {
  if(element) {
    element.classList.toggle(className);
  }
};

// Функция очистки элементов
const clearElement = (element) => {
  element.innerHTML = '';
};

// Функция склонения слов в зависимости от числительного
const getDeclineForm = (count, forms) => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return forms[2];
  }
  if (mod10 === 1) {
    return forms[0];
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return forms[1];
  }
  return forms[2];
};

// Перемешивание массива (алгоритм Фишера-Йетса)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// Функция debounce для устранения дребезга
const debounce = (callback, timeoutDelay = DEBOUNCE_TIME) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функция throttle для пропуска кадров
function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


export {
  getIdGenerator,
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  isEnterKey,
  toggleElementVisibility,
  clearElement,
  getDeclineForm,
  shuffleArray,
  debounce,
  throttle
};
