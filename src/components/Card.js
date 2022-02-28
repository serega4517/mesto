export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    const cardTitle = this._element.querySelector('.element__title');
    const cardImage = this._element.querySelector('.element__image');
    cardTitle.textContent = this._name;
    cardImage.alt = this._name;
    cardImage.src = this._link;

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
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
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

  // // Открытие изображения в модальном окне
  // _openPopupPhoto() {
  //   fullScreenImage.src = this._link;
  //   fullScreenImage.alt = this._name;
  //   imageDescription.textContent = this._name;
  //   openPopup(popupImage);
  // }
}
