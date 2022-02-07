import { fullScreenImage, imageDescription, openPopup, popupImage } from './index.js'

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // Метод создает карточку
  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    // Добавим обработчики
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
  }

  // Метод устанавливает слушателей событий
  _setEventListeners() {
    // Слушатель кнопки лайк
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._likeCardPhoto(evt);
    });

    // Слдушатель кнопки удаления карточки
    this._element.querySelector('.element__remove-button').addEventListener('click', (evt) => {
      this._deleteCard(evt);
    });

    // слушатель открытия попап с изображением
    this._element.querySelector('.element__image').addEventListener('click', (evt) => {
      this._openPopupPhoto(evt);
     });
  }
  // Лайк карточки
  _likeCardPhoto() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  // Удаление карточки
  _deleteCard() {
    this._element.remove();
  }

  // Открытие изображения в модальном окне
  _openPopupPhoto() {
    fullScreenImage.src = this._link;
    imageDescription.textContent = this._name;
    openPopup(popupImage);
  }
}
