import {
  SCALE_STEP,
  SCALE_MIN,
  SCALE_MAX,
  SCALE_DEFAULT } from './constants.js';

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
function onMinusButtonClick() {
  currentScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScaleUI();
}

// Увеличиваем масштаб
function onPlusButtonClick() {
  currentScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScaleUI();
}

function resetScale() {
  currentScale = SCALE_DEFAULT;
  updateScaleUI();
}

function initScale() {
  smallerButton.addEventListener('click', onMinusButtonClick);
  biggerButton.addEventListener('click', onPlusButtonClick);
  updateScaleUI();
}

export { initScale, resetScale };
