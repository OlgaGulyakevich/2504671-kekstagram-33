import { renderThumbnails } from './thumbnails.js';
import { setUploadForm } from './form-upload.js';
import { showDataError } from './show-alerts.js';
import { getData } from './api.js';
import { debounce } from './util.js';
import { initFilters } from './filters.js';

// Контейнер, куда рендерим полученные фото с сервера
const pictureContainer = document.querySelector('.pictures');

async function getPhotos() {
  try {
    const data = await getData();
    const debounceRenderThumbnails = debounce(renderThumbnails);
    initFilters (data, debounceRenderThumbnails);
    renderThumbnails(pictureContainer, data);
  } catch (error) {
    showDataError();
  }
}

getPhotos();

// Точка входа: вызываем все нужные инициализации
async function initApp() {

  // 1. Инициализируем форму загрузки своего фото
  setUploadForm();

  try {
    // 2. Запрашиваем данные
    const data = await getData();

    // 3. Подключаем фильтры с debounce
    const debounceRender = debounce((filtered) => {
      renderThumbnails(document.querySelector('.pictures'), filtered);
    }, 500);

    // 4. Инициируем фильтры (передаём raw-данные и коллбэк)
    initFilters(data, debounceRender);

    // 5. Первая отрисовка (все миниатюры без фильтра)
    renderThumbnails(document.querySelector('.pictures'), data);

  } catch (error) {
    showDataError();
  }
}

// Запуск всего приложения
initApp();
