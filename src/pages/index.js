import './index.css';
import Api from '../components/Api.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import {
  config,
  jobInput,
  nameInput,
  addButton,
  editButton,
  formProfileElement,
  cardFormElement,
  avatarEditButton,
  avatarFormElement
} from '../utils/constants.js';


let userID

// Экземпляр класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '440bd938-4919-41d5-a073-f8d309b7b884',
    'Content-Type': 'application/json'
  }
});

// Передаем массив с промисами, которые нужно выполнить
Promise.all([ api.getProfile(), api.getInitialCards() ])
  .then((res) => {
  // console.log(res)
    // Загрузка информации профиля пользователя
    userID = res[0]._id;
    userInfo.setUserInfo( res[0].name, res[0].about );
    userInfo.setUserAvatar(res[0]);

    // Загрузка карточек с сервера
    res[1].forEach(data => {
      const card = createCard(data);

      cards.addItem(card);
    })
  })
  .catch((err) => {
    console.log(err);
  })


// Экземпляр класса FormValidator
const editProfileFormValidation = new FormValidator(config, formProfileElement);
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
        confirmPopup.renderLoading(true);
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            confirmPopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            confirmPopup.renderLoading(false);
          })
      })
    },

    userID,

    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
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
  popupWithForm.renderLoading(true);
  api.editProfile(data.name, data.job)
    .then(() => {
      userInfo.setUserInfo(data.name, data.job);
      popupWithForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithForm.renderLoading(false);
    })
});

popupWithForm.setEventListeners();


// Экземпляр класса PopupWithForm
const popupWithFormCards = new PopupWithForm('.popup_type_new-card', (data) => {
  popupWithFormCards.renderLoading(true);
  api.addCard(data.name, data.link)
    .then((res) => {
      const card = createCard(res);
      cards.addOwnCard(card);
      popupWithFormCards.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormCards.renderLoading(false);
    })
  }
);

popupWithFormCards.setEventListeners();


const confirmPopup = new PopupWithForm('.popup_card-remove');

confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_avatar-edit', (data) => {
  avatarPopup.renderLoading(true);
  api.changeAvatar(data)
    .then(res => {
      userInfo.setUserAvatar(res);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
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