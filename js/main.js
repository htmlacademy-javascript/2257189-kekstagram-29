import './form.js';
import './message.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { renderPhotos } from './picture.js';
import { init, getFilteredPictures } from './filter.js';
import { FILTER } from './constants.js';

try {
  const data = await getData();
  const debouncedPictures = debounce(renderPhotos);
  init(data, debouncedPictures);
  renderPhotos(getFilteredPictures(FILTER.DEFAULT));
} catch {
  showAlert('Данные не загружены. Попробуйте обновить страницу');
}
