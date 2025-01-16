import { getIdGenerator, getRandomInteger, getRandomArrayElement} from './util.js';

export const PHOTO_DATA_COUNT = 25;
export const PHOTOS_MIN = 1;
export const PHOTOS_MAX = 25;
export const LIKES_MIN = 15;
export const LIKES_MAX = 200;
export const AVATAR_MIN = 1;
export const AVATAR_MAX = 6;
export const COMMENTS_MIN = 0;
export const COMMENTS_MAX = 30;


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

const generatePhotoId = getIdGenerator(); // Генератор ID для фотографий
const generateCommentId = getIdGenerator(); // Генератор ID для комментариев


// Генерация одного комментария
const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Генерация массива комментариев
const generateComments = () => {
  const commentsCount = getRandomInteger(COMMENTS_MIN, COMMENTS_MAX);
  return Array.from({length: commentsCount}, generateComment);
};

// Генерация одной фотографии
const generatePhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${getRandomInteger(PHOTOS_MIN, PHOTOS_MAX)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: generateComments(),
});


// Генерация массива фотографий
const generatePhotoData = (count = PHOTO_DATA_COUNT) => Array.from(
  {length: count},
  generatePhoto);

export { generatePhotoData };
