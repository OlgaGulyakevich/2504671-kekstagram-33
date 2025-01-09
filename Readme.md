
# Kekstagram: Учебный проект

Kekstagram — это учебный проект, созданный для отработки навыков работы с JavaScript, взаимодействия с DOM, реализации AJAX-запросов и работы с формами.

Основная цель проекта — разработка сервиса для просмотра и загрузки изображений с возможностью редактирования, добавления эффектов, комментариев и хэштегов.
***

* Наставник: [Maxim Ivanov](https://htmlacademy.ru/profile/id342945).
* Курс «[JavaScript. Профессиональная разработка веб-интерфейсов](https://htmlacademy.ru/intensive/javascript)» от [HTML Academy](https://htmlacademy.ru)

**Продолжительность работы**

Проект выполнен за 10 недель в рамках образовательной программы.
## Cсылка на проект

https://olgagulyakevich.github.io/2504671-kekstagram-33/


## Стек технологий

**HTML5:** Разметка

**CSS3:** Стилизация

**JavaScript (ES6+):** Основной язык разработки

**noUiSlider:** Реализация слайдера для выбора интенсивности эффектов.

**Pristine.js:** Валидация формы.

**Fetch API:** Отправка и получение данных с сервера.


## Реализованные функции



**Загрузка изображения**

- При выборе файла отображается превью, открывается форма редактирования.

**Редактирование**

- **Масштабирование**: 25%–100%, шаг 25%.
- **Эффекты**: *grayscale*, *sepia*, *invert*, *blur*, *brightness*.
- **Регулировка интенсивности эффекта**: через слайдер **noUiSlider**, с записью значения в скрытое поле.

**Валидация**

- **Хэштеги**: максимум 5, уникальность, допустимые символы и т.д.
- **Комментарий**: до 140 символов.
- Ошибки отображаются под полями.

**Отправка формы**

- Данные уходят на сервер методом **POST**.
- При успехе/ошибке — отображение соответствующего экрана, закрытие формы, сброс полей.

**Просмотр изображений других пользователей**

- Загрузка массива фотографий и комментариев с удалённого сервера.
- Отрисовка миниатюр.
- Полноэкранный режим с порционной подгрузкой комментариев.

**Фильтрация**

- **По умолчанию**, **случайные**, **обсуждаемые**.
- Устранение «дребезга» (500 мс).

**Комментарии**

- Добавление комментариев: При открытом полноэкранном режиме пользователь может ввести текст в форму и отправить комментарий.
- Валидация с помощью Pristine.js: поле не может быть пустым и не должно превышать 140 символов.
- Удаление комментариев: каждый добавленный комментарий имеет кнопку «Удалить», позволяющую убрать его из списка.

**Лайки**

- Одиночный лайк: При клике на счётчик лайков фотография получает +1 лайк.
- Предотвращение повторного лайка: повторный клик не увеличивает счётчик лайков повторно (учтён флаг «hasUserLiked»).

## Установка и запуск (локально)

Убедитесь, что у вас установлен **Node.js** (версия 18+) и **npm** (версия 9+).

**Клонируйте репозиторий:**

```bash
git clone https://github.com/olgagulyakevich/2504671-kekstagram-33.git
```
**Установите зависимости:**

```bash
cd 2504671-kekstagram-33
npm install
```

**Запустите локальный сервер:**

```bash
npm run start
```

**Проверка качества кода**

```bash
npm run lint
```
Это проверит JS-файлы по правилам ESLint.



## Благодарности

- Команде [HTML Academy](https://htmlacademy.ru) за материалы и консультации.
- Наставнику за поддержку и советы.

---

#### Буду рада любым отзывам и Pull Request!
