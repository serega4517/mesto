import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards } from '../utils/cards.js'
import { config, formElement, cardFormElement, nameInput, jobInput, editButton, addButton } from '../utils/constants.js';

import './index.css';


// Экземпляр класса FormValidator
const editProfileFormValidation = new FormValidator(config, formElement);
const addCardFormValidation = new FormValidator(config, cardFormElement);
// Включение валидации форм
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();


// Создание новой карточки
function createCard(item) {
  const card = new Card(item, '.template', () => {
    popupWithImage.open(item);
  });

  return card.generateCard();
}


// Экземпляр класса UserInfo
const userInfo = new UserInfo({ name: '.profile__user-name', job: '.profile__user-job' });


// Экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_type_fullscreen-image');

popupWithImage.setEventListeners();


// Экземпляр класса PopupWithForm
const popupWithForm = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo({name: data.name, job: data.job});
  popupWithForm.close();
});

popupWithForm.setEventListeners();


// Экземпляр класса PopupWithForm
const popupWithFormCards = new PopupWithForm('.popup_type_new-card', (data) => {
  const card = createCard(data);

  cards.addItem(card);
  popupWithFormCards.close();
  }
);

popupWithFormCards.setEventListeners();


// Экземпляр класса Section
const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  }
}, '.elements');

cards.renderer();


// Слушатели событий
editButton.addEventListener('click', () => {
  popupWithForm.open();

  const getInfo = userInfo.getUserInfo();

  nameInput.value = getInfo.name;
  jobInput.value = getInfo.job;

  editProfileFormValidation.enableSubmitButton();
  editProfileFormValidation.resetValidation();
});

addButton.addEventListener('click', () => {
  popupWithFormCards.open();
  // Сброс ошибок валидации, при открытии попапа
  addCardFormValidation.resetValidation();
});
