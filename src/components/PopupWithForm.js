import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);

    this._submitFormCallback = submitFormCallback;

    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._saveButton = this._popupSelector.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._submitFormCallback = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitFormCallback(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();

    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = 'Сохранить';
    }
  }
}