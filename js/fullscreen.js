import { isEscapeKey, toggleElementVisibility, clearElement, getDeclineForm } from './util.js';
import { COMMENTS_PER_PAGE } from './constants.js';
import { initComment, destroyComment } from './form-comments.js';


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
let isLiked = false;

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


//  Отрисовывает одну «порцию» комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment();

  // Отображает следующую порцию комментариев
  const nextComments = loadedComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_PER_PAGE);
  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);

  //Обновляет счетчик комментариев
  displayedCommentsCount += nextComments.length;
  shownCommentsCount.textContent = displayedCommentsCount;

  // Склоняет «комментарий/комментария/комментариев»
  const commentWord = getDeclineForm(displayedCommentsCount, ['комментарий', 'комментария', 'комментариев']);
  commentsCountBlock.innerHTML =
  ` <span class="social__comment-shown-count">${displayedCommentsCount}</span> из
    <span class="social__comment-total-count">${loadedComments.length}</span> ${commentWord}`;

  // Если комментариев нет
  if (loadedComments.length === 0) {
    commentsCountBlock.innerHTML = 'Пока никто не оставил комментариев...';
    loadMoreButton.classList.add('hidden');
    return;
  }

  // Скрывает кнопку, если все комментарии показаны
  loadMoreButton.classList.toggle('hidden', displayedCommentsCount >= loadedComments.length);
};

// При клике на лайк (один раз)
function onLikesClick() {
  if (!isLiked) {
    likesCount.textContent = Number(likesCount.textContent) + 1;
    isLiked = true;
  }
}

// Заполняет данные о фото
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

// Клик по кнопке «Загрузить ещё»
function onLoadMoreButtonClick(evt) {
  evt.preventDefault();
  renderComments();
}

// Клавиша Esc
function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
}


// Закрывает полноэкранный просмотр фото
function onCloseButtonClick() {
  toggleElementVisibility(fullscreenBlock, 'hidden');
  toggleElementVisibility(document.body, 'modal-open');

  // Убираем «комментарии»
  destroyComment();

  loadMoreButton.removeEventListener('click', onLoadMoreButtonClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
  likesCount.removeEventListener('click', onLikesClick);
  document.removeEventListener('keydown', onEscKeydown);

  // Сброс лайка при закрытии
  isLiked = false;
}


// Открывает полноэкранный просмотр
function onThumbnailClick(evt, thumbnailData) {
  evt.preventDefault();
  fillPhotoData(thumbnailData);

  toggleElementVisibility(fullscreenBlock, 'hidden');
  toggleElementVisibility(document.body, 'modal-open');

  // Инициализация формы комментариев
  initComment();

  loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  likesCount.addEventListener('click', onLikesClick);
  document.addEventListener('keydown', onEscKeydown);
}

export { onThumbnailClick };
