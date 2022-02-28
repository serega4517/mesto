import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(values) {
    super.open();

    this._image = this._popupSelector.querySelector('.popup__image');
    this._imageDescription = this._popupSelector.querySelector('.popup__image-description');
    this._imageDescription.textContent = values.name;
    this._image.src = values.link;
    this._image.alt = values.name;
  }
}