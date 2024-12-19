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

// Переключение классов
const toggleClass = (element, className = '') => {
  if(element) {
    element.classList.toggle(className);
  }
};

// Функция очистки элементов
const clearElement = (element) => {
  element.innerHTML = '';
};

/**
 * Функция склонения слов в зависимости от числительного
 * @param {number} count - Число, для которого нужно склонить слово
 * @param {Array} forms - Массив форм слова [1, 2-4, 5-0]
 * @returns {string}  - Правильная форма слова
 */
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

export {
  getIdGenerator,
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  toggleClass,
  clearElement,
  getDeclineForm
};
