import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import { api } from '../components/Api.js';
import { config, formElement, avatarFormElement, cardFormElement, nameInput, jobInput, editButton, addButton, avatarEditButton } from '../utils/constants.js';

let userID

api.getProfile()
  .then(res => {
    userID = res._id
    userInfo.setUserInfo( res.name, res.about )
    userInfo.setUserAvatar(res)
  })

api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const card = createCard(data);

      cards.addItem(card);
    })
  })



// Экземпляр класса FormValidator
const editProfileFormValidation = new FormValidator(config, formElement);
const addCardFormValidation = new FormValidator(config, cardFormElement);
const editAvatarFormValidation = new FormValidator(config, avatarFormElement);
// Включение валидации форм
editProfileFormValidation.enableValidation();
addCardFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();


// Создание новой карточки
function createCard(item) {
  const card = new Card(
    item,

    '.template',

    () => {
      popupWithImage.open(item);
    },

    (id) => {
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard()
          })
      })
    },

    userID,

    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
      }
    }
  );

  return card.generateCard();
}


// Экземпляр класса Section
const cards = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  }
}, '.elements');

cards.renderer();


// Экземпляр класса UserInfo
const userInfo = new UserInfo({ name: '.profile__user-name', job: '.profile__user-job' }, '.profile__avatar');


// Экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup_type_fullscreen-image');

popupWithImage.setEventListeners();


// Экземпляр класса PopupWithForm
const popupWithForm = new PopupWithForm('.popup_type_profile', (data) => {
  api.editProfile(data.name, data.job)
    .then(() => {
      userInfo.setUserInfo(data.name, data.job);
      popupWithForm.close();
    })
});

popupWithForm.setEventListeners();


// Экземпляр класса PopupWithForm
const popupWithFormCards = new PopupWithForm('.popup_type_new-card', (data) => {
  api.addCard(data.name, data.link)
    .then(() => {
      const card = createCard(data);
      cards.addItem(card);
      popupWithFormCards.close();
    })
  }
);

popupWithFormCards.setEventListeners();


const confirmPopup = new PopupWithForm('.popup_card-remove');

confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_avatar-edit', (data) => {
  api.changeAvatar(data)
    .then(res => {
      userInfo.setUserAvatar(res)
    })
});

avatarPopup.setEventListeners();


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

avatarEditButton.addEventListener('click', () => {
  avatarPopup.open();

  editAvatarFormValidation.resetValidation();
})