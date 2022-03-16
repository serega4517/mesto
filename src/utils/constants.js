// Popup
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupAvatarEdit = document.querySelector('.popup_avatar-edit');
// Кнопка редактирования профиля
export const editButton = document.querySelector('.profile__edit-button'); //
// Кнопка добавления карточки
export const addButton = document.querySelector('.profile__add-button');

export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
// Форма popup
export const formProfileElement = document.querySelector('.popup__form-profile');
export const cardFormElement = popupNewCard.querySelector('.popup__form');
export const avatarFormElement = popupAvatarEdit.querySelector('.popup__form-image');
// Инпуты имени и описания профиля popup
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

// Настройки валидации
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
