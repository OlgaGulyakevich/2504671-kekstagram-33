import {
  isEscapeKey,
  toggleClass,
  clearElement,
  getDeclineForm } from './util.js';

const COMMENTS_PER_PAGE = 5;

const fullscreenBlock = document.querySelector('.big-picture');
const fullscreenPhoto = fullscreenBlock.querySelector('.big-picture__img img');
const likesCount = fullscreenBlock.querySelector('.likes-count');
const photoCaption = fullscreenBlock.querySelector('.social__caption');
const commentsList = fullscreenBlock.querySelector('.social__comments');
const closeButton = fullscreenBlock.querySelector('.big-picture__cancel');

const commentsCountBlock = fullscreenBlock.querySelector('.social__comment-count');
const shownCommentsCount = commentsCountBlock.querySelector('.social__comment-shown-count');
const totalCommentsCount = commentsCountBlock.querySelector('.social__comment-total-count');
const loadMoreButton = fullscreenBlock.querySelector('.comments-loader');

let loadedComments = [];
let displayedCommentsCount = 0;


// Создает один комментарий
const createComment = ({ avatar, name, message }) => {
  const commentTemplate = document
    .querySelector('#comment')
    .content.querySelector('.social__comment');

  const newComment = commentTemplate.cloneNode(true);

  const newCommentImg = newComment.querySelector('.social__picture');
  newCommentImg.src = avatar;
  newCommentImg.alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};


// Отрисовывает комментарии
const renderComments = () => {
  const fragment = document.createDocumentFragment();

  // Отображает следующую порцию комментариев
  const nextComments = loadedComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_PER_PAGE);
  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);

  //Обновляет количество комментариев с учетом склонения
  displayedCommentsCount += nextComments.length;
  shownCommentsCount.textContent = displayedCommentsCount;

  const commentWord = getDeclineForm(displayedCommentsCount, ['комментарий', 'комментария', 'комментариев']);
  commentsCountBlock.innerHTML =
  ` <span class="social__comment-shown-count">${displayedCommentsCount}</span> из
    <span class="social__comment-total-count">${loadedComments.length}</span> ${commentWord}`;

  // Если комментариев нет
  if (loadedComments.length === 0) {
    commentsCountBlock.innerHTML = 'Пока никто не оставил комментариев.';
    return;
  }

  // Скрываем кнопку, если все комментарии показаны
  loadMoreButton.classList.toggle('hidden', displayedCommentsCount >= loadedComments.length);
};


// Заполняет информацию о фотографии
const fillPhotoData = ({url, likes, description, comments}) => {
  fullscreenPhoto.src = url;
  fullscreenPhoto.alt = description;
  photoCaption.textContent = description;
  likesCount.textContent = likes;

  totalCommentsCount.textContent = comments.length;
  loadedComments = comments;
  displayedCommentsCount = 0;

  clearElement(commentsList);
  renderComments(comments);
};

// Обработчик загрузки дополнительных комментариев
const onLoadMoreButtonClick = (evt) => {
  evt.preventDefault();
  renderComments();
};

// Обработчик нажатия клавиши ESC
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
};

// Обработчик закрытия полноэкранного просмотра
function onCloseButtonClick () {
  toggleClass (fullscreenBlock, 'hidden');
  toggleClass (document.body, 'modal-open');

  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscKeydown);
}

// Обработчик открытия полноэкранного просмотра
const onThumbnailClick = (evt, thumbnail) => {
  evt.preventDefault();
  fillPhotoData(thumbnail);

  toggleClass(fullscreenBlock, 'hidden');
  toggleClass(document.body, 'modal-open');

  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

export { onThumbnailClick };
