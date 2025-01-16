import {shuffleArray} from './util.js';
import {Filters, RANDOM_PHOTO_MAX} from './constants.js';

const currentfilter = Filters.DEFAULT;
// const photos = [];

const getRandomPhotos = (photos) => {
  const shuffledPhotos = shuffleArray([...photos]);
  return shuffledPhotos.slice(0, RANDOM_PHOTO_MAX);
};


const getFilteredPhotos = (photos, cb) => {
  const randomButton = document.querySelector('#random-filter'); // Кнопка для фильтра "Случайные"
  randomButton.addEventListener('click', () => {
    // Генерируем 10 случайных фотографий
    const randomPhotos = getRandomPhotos(photos);

    // Вызываем коллбэк с результатом
    cb(randomPhotos);
  });
};


const getByCommentPhotos = (pictureA, pictureB) => {
  pictureB.comments.length - pictureA.comments.length;
};


// Работа с данными
// getData()
//   .then((photos) => {
//     // Изначальная отрисовка всех фотографий
//     renderPhotosThumbnails(photos);

//     // Устанавливаем обработчик для случайных фотографий
//     setRandomFilterClick(photos, (randomPhotos) => {
//       renderPhotosThumbnails(randomPhotos);
//     });
//   })
//   .catch((err) => {
//     showAlert(err.message);
//   });

export {};
