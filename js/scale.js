import { SCALE_STEP, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT } from './constants.js';

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');

// Храним текущее значение масштаба (число)
let currentScale = SCALE_DEFAULT; // 100

// Функция, чтобы отобразить scale в интерфейсе
function updateScaleUI() {
  scaleValueInput.value = `${currentScale}%`;
  previewImg.style.transform = `scale(${currentScale / 100})`;
}

// Уменьшаем масштаб
function onSmallerButtonClick() {
  currentScale = currentScale - SCALE_STEP;
  if (currentScale < SCALE_MIN) {
    currentScale = SCALE_MIN;
  }
  updateScaleUI();
}

// Увеличиваем масштаб
function onBiggerButtonClick() {
  currentScale = currentScale + SCALE_STEP;
  if (currentScale > SCALE_MAX) {
    currentScale = SCALE_MAX;
  }
  updateScaleUI();
}

function resetScale() {
  currentScale = SCALE_DEFAULT;
  updateScaleUI();
}

function initScale() {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
  updateScaleUI();
}

export { initScale, resetScale };
