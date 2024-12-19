import { onThumbnailClick } from './fullscreen.js';

// Создает миниатюру фотографии на основе данных
const createThumbnail = ({ url, description, likes, comments }) => {
  const pictureTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  // Клонирование шаблона
  const newThumbnail = pictureTemplate.cloneNode(true);

  // Настройка изображения
  const newThumbnailImg = newThumbnail.querySelector('.picture__img');
  newThumbnailImg.src = url;
  newThumbnailImg.alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likes;
  newThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return newThumbnail;
};


// Отрисовывает миниатюры фотографий в заданный контейнер
const renderThumbnails = (container, photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);

    // Открывает полноэкранный режим просмотра по клику на миниатюру
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      onThumbnailClick(evt, photo);
    });

    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbnails };
