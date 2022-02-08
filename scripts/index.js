import { initialCards } from './cards.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';
export { fullScreenImage, imageDescription, popupImage, openPopup }

// Popup
const popupProfile = document.querySelector('.popup_type_profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_fullscreen-image');
// Все Popup
const popups = document.querySelectorAll('.popup');
// Кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// Кнопка добавления карточки
const addButton = document.querySelector('.profile__add-button');
// Имя и описание профиля
const nameElement = document.querySelector('.profile__user-name');
const jobElement = document.querySelector('.profile__user-job');
// Форма popup
const formElement = document.querySelector('.popup__form');
const cardFormElement = popupNewCard.querySelector('.popup__form');
// Инпуты имени и описания профиля popup
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
// Инпуты названия и ссылки на новое изображение
const imageNameInput = document.querySelector('.popup__input_type_title');
const imageLinkInput = document.querySelector('.popup__input_type_link');
// Секция elements
const cardsSection = document.querySelector('.elements');
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

// Экземпляр класса FormValidator
const editProfileFormValidation = new FormValidator(config, formElement);
const addCardFormValidation = new FormValidator(config, cardFormElement);
// Включение валидации форм
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();

// Создание новой карточки
function createCard(item) {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();

  return cardElement;
}

// Перебор массива с объектами карточек
initialCards.forEach((item) => {
  const cardElement = createCard(item);

  cardsSection.prepend(cardElement);
});

// Функция закрытия popup по нажатию клавиши Esc
const exitByEscButton = (evt) => {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Функция закрытия popup по клику на overlay
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
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

// Сохранение данных при редактировании профиля
// и отмена действия события по умолчанию
function editFormSubmitHandler (evt) {
    evt.preventDefault();

    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;

    closePopup(popupProfile);
}

// Добавление новой карточки
function submitAddNewCard(evt) {
  evt.preventDefault();

  const newCard = new Card({name: imageNameInput.value, link: imageLinkInput.value}, '.template');
  const card = newCard.generateCard();
  cardsSection.prepend(card);

  closePopup(popupNewCard);

  imageNameInput.value = '';
  imageLinkInput.value = '';

  // Делаем кнопку "Создать" неактивной, после добавления новой карточки
  addCardFormValidation.disableSubmitButton();
}

// Слушатели событий
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  // Сделал кнопку 'Сохранить' активной при открытии попапа редактирования описания профиля,
  // т.к при открытии попапа, заполненные поля формы - валидны (но, не уверен, что это нужно)
  editProfileFormValidation.enableSubmitButton();
});

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
  // Сброс ошибок валидации, при открытии попапа
  addCardFormValidation.resetValidation();
})
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', editFormSubmitHandler);
popupNewCard.addEventListener('submit', submitAddNewCard);