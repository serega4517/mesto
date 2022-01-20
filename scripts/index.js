// Popup
const popupProfile = document.querySelector('.popup_type_profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_fullscreen-image');
// Все Popup
const popups = document.querySelectorAll('.popup');
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
// Настройки валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Функция закрытия popup по нажатию клавиши Esc
const exitByEscButton = (evt) => {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Функция закрытия popup по нажатию  на overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
});

// Функция открытия popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', exitByEscButton);
}

// Функция закрытия popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', exitByEscButton);
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;

    closePopup(popupProfile);
}

// Перебор массива с карточками
initialCards.forEach((item) => addCard(item.name, item.link));

// Добавление карточек
function addCard(name, link) {
  const cardElement = createNewCard(name, link);
  cardsSection.prepend(cardElement);
}

// Создание карточки
function createNewCard(name, link) {
  const cardTemplale = template.content;
  const cardElement = cardTemplale.querySelector('.element').cloneNode(true);
  const imageElement =  cardElement.querySelector('.element__image');
  const titleElement = cardElement.querySelector('.element__title');
  titleElement.textContent = name;
  imageElement.src = link;
  imageElement.alt = name;

// Работа кнопки 'like'
// Изменил работу кнопки like с испльзованием делегирования события
cardElement.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__like-button')){
  evt.target.classList.toggle('element__like-button_active');
    }
});

// Удаление карточки на кнопку
  const removeButton = cardElement.querySelector('.element__remove-button');
  removeButton.addEventListener('click', () => cardElement.remove());

//Открытие картинки в popup
  imageElement.addEventListener('click', () => {
    fullScreenImage.src = imageElement.src;
    fullScreenImage.alt = titleElement.textContent;
    imageDescription.textContent = titleElement.textContent;

    openPopup(popupImage);
});

  return cardElement;
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

enableValidation(config);