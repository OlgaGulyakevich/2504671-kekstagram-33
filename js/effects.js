import { EFFECTS, HIDDEN_CLASS } from './constants.js';

const previewImg = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');


let currentEffect = EFFECTS.none;

// Инициализируем noUiSlider
function initSlider() {
  noUiSlider.create(sliderElement, {
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.start,
    step: currentEffect.step,
    connect: 'lower'
  });

  // Слушаем событие обновления слайдера
  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    effectLevelValue.value = sliderValue;
    applyEffect(sliderValue);
  });
}

// Применяем CSS-фильтр к превью
function applyEffect(value) {
  if (currentEffect.name === 'none') {
    previewImg.style.filter = 'none';
    return;
  }

  previewImg.style.filter = `${currentEffect.style}(${value}${currentEffect.unit})`;
}


function updateSliderOptions(effect) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.start,
    step: effect.step
  });
}


function onEffectChange(evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName];

  // Если выбрали «none» — прячем слайдер, убираем filter
  if (currentEffect.name === 'none') {
    sliderContainer.classList.add(HIDDEN_CLASS);
    previewImg.style.filter = 'none';
    effectLevelValue.value = '';
  } else {
    sliderContainer.classList.remove(HIDDEN_CLASS);
    updateSliderOptions(currentEffect);
  }
}


function resetEffects() {
  currentEffect = EFFECTS.none;
  previewImg.style.filter = 'none';
  effectLevelValue.value = '';
  sliderContainer.classList.add(HIDDEN_CLASS);
  sliderElement.noUiSlider.updateOptions({
    range: { min: 0, max: 100 },
    start: 100,
    step: 1
  });
}

// Инициализация
function initEffects() {
  sliderContainer.classList.add(HIDDEN_CLASS);
  initSlider();
  effectsList.addEventListener('change', onEffectChange);
}

export { initEffects, resetEffects };
