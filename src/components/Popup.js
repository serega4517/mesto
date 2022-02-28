export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
    // document.addEventListener('mousedown', this._handleOverlayClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
    // document.removeEventListener('mousedown', this._handleOverlayClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button')
    .addEventListener('click', () => {
      this.close();
    })
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClose.bind(this))
  }
}