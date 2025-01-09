export const PHOTO_DATA_COUNT = 25;
export const PHOTOS_MIN = 1;
export const PHOTOS_MAX = 25;
export const LIKES_MIN = 15;
export const LIKES_MAX = 200;
export const AVATAR_MIN = 1;
export const AVATAR_MAX = 6;
export const COMMENTS_MIN = 0;
export const COMMENTS_MAX = 30;

export const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

export const Route = {
  GET_DATA: '/data',
  GET_COMMENTS: '/comments',
  SEND_DATA: '/',
};
export const Method = {
  GET: 'GET',
  POST: 'POST',
};
export const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
  SEND_COMMENTS: 'Не удалось отправить комментарий. Попробуйте ещё раз',
};

export const ALERT_SHOW_TIME = 5000;

export const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЮ...'
};


export const FileTypes = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];

export const COMMENTS_PER_PAGE = 5;

export const MAX_HASHTAGS = 5;

export const HASHTAG_REGEX = /^#[a-zA-Zа-яА-Я0-9]+$/;

export const MAX_HASHTAG_LENGTH = 20;

export const HASHTAG_ERROR_MESSAGES = {
  START_WITH_HASH: 'Хэштег должен начинаться с символа #.',
  START_ONLY_HASH: 'Хэштег не может состоять только из символа #.',
  VALID_CHARACTERS: 'Хэштег должен состоять из букв и чисел.',
  MAX_LENGTH: `Максимальная длина хэштега — ${MAX_HASHTAG_LENGTH} символов, включая #.`,
  UNIQUE: 'Хэштеги не должны повторяться.',
  MAX_COUNT: `Нельзя указать больше ${MAX_HASHTAGS} хэштегов.`
};

export const SCALE_STEP = 25;
export const SCALE_MIN = 25;
export const SCALE_MAX = 100;
export const SCALE_DEFAULT = 100;

export const HIDDEN_CLASS = 'hidden';

export const EFFECTS = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: ''
  }
};


export const NAMES = [
  'Настя_yellow',
  'Kate',
  'Иван',
  'Маша',
  'Olly_Sunshine',
  'Женя',
  'Олег',
  'Кирилл Ivanov',
  'Alex'
];

export const DESCRIPTIONS = [
  'Прекрасный день!',
  'Новая фотография для альбома.',
  'Делюсь своими впечатлениями.',
  'Захватывающее место!',
  'Это был незабываемый момент.',
  'Доброе утро, Мир!',
  'Всем хорошего дня и прекрасного настроения.',
];

export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
