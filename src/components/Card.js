export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick, userId, handleLikeClick) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._owner = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);

    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;

    const likeCountElement = this._element.querySelector('.element__like-counter');

    likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._like();
    } else {
      this._deleteLike();
    }
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

    this.setLikes(this._likes);

    if(this._owner !== this._userId) {
      this._element.querySelector('.element__remove-button').style.display = 'none';
    }

    return this._element;
  }

  // Метод устанавливает слушателей событий
  _setEventListeners() {
    // Слушатель кнопки лайк
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    // Слдушатель кнопки удаления карточки
    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    // слушатель открытия попап с изображением
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
     });
  }

  _like() {
    this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
  }

  _deleteLike() {
    this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
