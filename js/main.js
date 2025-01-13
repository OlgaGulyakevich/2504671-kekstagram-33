import {renderThumbnails} from './thumbnails.js';
import './form-upload.js';
import {showDataError} from './show-alerts.js';
import {getData} from './api.js';

// Контейнер, куда рендерим полученные данные с сервера
const pictureContainer = document.querySelector('.pictures');

async function getPhotos() {
  try {
    const data = await getData();
    renderThumbnails(pictureContainer, data);
  } catch (error) {
    showDataError();
  }
}

getPhotos();
