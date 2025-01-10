
import { MAX_FILE_SIZE, FileErrorMessages } from './constants.js';

/**
 * Создает и показывает уведомление об ошибке
 * @param {string} message - текст сообщения
 * @returns {void}
 */
const createErrorNotification = (message) => {
  const notificationTemplate = `
    <div class="error-notification">
      <p class="error-notification__message">${message}</p>
    </div>
  `;

  const notificationElement = document.createElement('div');
  notificationElement.innerHTML = notificationTemplate;
  const notification = notificationElement.firstElementChild;

  document.body.append(notification);

  // Удаляем уведомление через 5 секунд
  setTimeout(() => {
    notification.classList.add('error-notification--hiding');

    // Ждем окончания анимации перед удалением
    notification.addEventListener('animationend', () => {
      notification.remove();
    });
  }, 5000);
};

/**
 * Проверяет размер файла и показывает уведомление при превышении
 * @param {FormData} formData - данные формы
 * @param {Object} options - дополнительные настройки
 * @param {string} options.fieldName - имя поля с файлом (по умолчанию 'filename')
 * @returns {Object} - результат валидации { valid: boolean, error?: string }
 */
const validateFileSize = (formData, options = {}) => {
  const { fieldName = 'filename' } = options;
  const file = formData.get(fieldName);

  if (!file) {
    return { valid: true };
  }

  if (file.size > MAX_FILE_SIZE) {
    createErrorNotification(FileErrorMessages.MAX_SIZE);
    return { valid: false, error: FileErrorMessages.MAX_SIZE };
  }

  return { valid: true };
};

// Стили для уведомления
const style = document.createElement('style');
style.textContent = `
  .error-notification {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: #ff4444;
    color: white;
    text-align: center;
    font-size: 1.2rem;
    animation: slideIn 0.5s ease-out;
    z-index: 1000;
  }

  .error-notification--hiding {
    animation: slideOut 0.5s ease-in;
  }

  .error-notification__message {
    margin: 0;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
`;

document.head.appendChild(style);

export { validateFileSize };
