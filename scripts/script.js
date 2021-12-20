const initialCards = [
  {
    name: 'Неон',
    link: 'https://images.unsplash.com/photo-1637410967210-f19323f0d33a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=399&q=80'
  },
  {
    name: 'Тыквы',
    link: 'https://images.unsplash.com/photo-1637614895214-4a1cb4d1b173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80'
  },
  {
    name: 'Лего',
    link: 'https://images.unsplash.com/photo-1637670687638-50cc3a81e04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Авто',
    link: 'https://images.unsplash.com/photo-1637674855785-84d0270d64c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
  },
  {
    name: 'Скульптура',
    link: 'https://images.unsplash.com/photo-1637666505754-7416ebd70cbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Полет',
    link: 'https://images.unsplash.com/photo-1637420425895-97a239041d53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1148&q=80'
  }
];
// Popup
const popupProfile = document.querySelector('.popup__type_profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup__type_fullscreen-image');
// Кнопка закрытия Popup
const closeButton = document.querySelector('.popup__close-button');
const closeButtonCard = document.querySelector('.popup__close-button_card');
const closeButtonImage = document.querySelector('.popup__close-button_fullscreen-image');
// Кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// Кнопка добавления карточки
const addButton = document.querySelector('.profile__add-button');
// Имя и описание профиля
const nameElement = document.querySelector('.profile__user-name');
const jobElement = document.querySelector('.profile__user-job');
// Форма popup
let formElement = document.querySelector('.popup__form');
// Инпуты имени и описания профиля popup
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
// Инпуты названия и ссылки на новое изображение
const imageNameInput = document.querySelector('.popup__input_type_title');
const imageLinkInput = document.querySelector('.popup__input_type_link');
// Секция elements
const cardsSection = document.querySelector('.elements');
// temlate
const template = document.querySelector('.template');
// Изображение и описание в popup full screen
const fullScreenImage = document.querySelector('.popup__image');
const imageDescription = document.querySelector('.popup__image-description');

// Функция открытия popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// Функция закрытия popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;

    closePopup(popupProfile);
}

// Перебор массива с карточками
initialCards.forEach((item) => {
  return addCard(item.name, item.link);
});

// Добавление карточек
function addCard(name, link) {
  const cardElement = createNewCard(name, link);
  cardsSection.prepend(cardElement);
}

// Создание карточки
function createNewCard(name, link) {
  const cardTemplale = template.content;
  const cardElement = cardTemplale.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = name;
  // Работа кнопки 'like'
  cardElement.querySelector('.element__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  })

  openFullScreenImage(cardElement);
  deleteCard(cardElement);

  return cardElement;
}

// Открытие картинки в popup
function openFullScreenImage(item) {
  const image = item.querySelector('.element__image');
  const title = item.querySelector('.element__title');
  image.addEventListener('click', () => {
    fullScreenImage.src = image.src;
    fullScreenImage.alt = title.textContent;
    imageDescription.textContent = title.textContent;

    openPopup(popupImage);
  })
}

// Удаление карточки на кнопку
function deleteCard(cardElement) {
  cardElement.querySelector('.element__remove-button').addEventListener('click', () => cardElement.remove());
}

//
function submitAddNewCard(evt) {
  evt.preventDefault();
  addCard(imageNameInput.value, imageLinkInput.value);

  closePopup(popupNewCard);

  imageNameInput.value = '';
  imageLinkInput.value = '';
}

// Слушатели событий
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
});
closeButton.addEventListener('click', () => closePopup(popupProfile));
addButton.addEventListener('click', () => openPopup(popupNewCard));
closeButtonCard.addEventListener('click', () => closePopup(popupNewCard));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
popupNewCard.addEventListener('submit', submitAddNewCard);