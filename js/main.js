import { renderThumbnails } from './thumbnails.js';
import { setUploadForm } from './form-upload.js';
import { showDataError } from './show-alerts.js';
import { getData } from './api.js';
import { debounce } from './util.js';
import { initFilters } from './filters.js';


async function initApp() {
  setUploadForm();

  try {
    const data = await getData();
    const container = document.querySelector('.pictures');
    const uploadForm = container.querySelector('.img-upload');

    const debouncedRender = debounce((filteredPhotos) => {
      container.innerHTML = '';
      if (uploadForm) {
        container.append(uploadForm);
      }
      renderThumbnails(container, filteredPhotos);
    });

    initFilters(data, debouncedRender);
    renderThumbnails(container, data);

  } catch (error) {
    showDataError();
  }
}

initApp();
