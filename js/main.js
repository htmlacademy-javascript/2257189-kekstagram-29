import './picture.js';
import './form.js';
import './effects.js';
import './scale.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderPhotos } from './picture.js';

try {
  const data = await getData();
  renderPhotos(data);
} catch {
  showAlert('Данные не загружены. Попробуйте обновить страницу');
}
