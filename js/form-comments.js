const commentForm = document.querySelector('.social__footer-form');
const commentContainer = document.querySelector('.social__comments');
const commentInput = document.querySelector('.social__footer-text');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let pristine;

function initComment() {

  // Инициализируем Pristine
  const pristineConfig = {
    classTo: 'social__footer-form',
    errorTextParent: 'social__footer-form',
    errorTextClass: 'social__footer-wrapper--error'
  };

  pristine = new Pristine(commentForm, pristineConfig);

  pristine.addValidator(
    commentInput,
    (value) => value.trim().length >= 1,
    'Комментарий не может быть пустым.'
  );
  commentForm.addEventListener('submit', onCommentFormSubmit);
}


function destroyComment() {
  commentForm.removeEventListener('submit', onCommentFormSubmit);
  pristine.reset();
  pristine = null;
  commentInput.value = '';

}

function onCommentFormSubmit(evt) {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }

  const text = commentInput.value.trim();

  // Создаём новый комментарий из шаблона
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = 'img/avatar-6.svg';
  newComment.querySelector('.social__text').textContent = text;

  // Опционально: кнопка «Удалить»
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('social__comment-delete');
  deleteBtn.textContent = 'Удалить';
  newComment.append(deleteBtn);

  deleteBtn.addEventListener('click', () => {
    newComment.remove();
  });

  commentContainer.prepend(newComment);
  commentInput.value = '';
}

export { initComment, destroyComment };
