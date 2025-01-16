import { renderThumbnails } from './thumbnails.js';
import { setUploadForm } from './form-upload.js';
import { showDataError } from './show-alerts.js';
import { getData } from './api.js';
import { debounce } from './util.js';
import { initFilters } from './filters.js';


// // Точка входа: вызываем все нужные инициализации
async function initApp() {
  setUploadForm();

  try {
    const data = await getData();
    const container = document.querySelector('.pictures');

    const debouncedRender = debounce((filteredPhotos) => {
      container.innerHTML = '';
      renderThumbnails(container, filteredPhotos);
    });

    initFilters(data, debouncedRender);

    renderThumbnails(container, data);

  } catch (error) {
    showDataError();
  }
}

initApp();
